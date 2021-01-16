import { objectType } from "nexus";
import lightsLoader from "../../dataLoader/lightsLoader";
import PhilipsHueLightType from "../lights/philipsHueLight";

const PhilipsHueGroupsType = objectType({
    name: "PhilipsHueGroups",
    definition(t) {
        t.id("bridgeId");
        t.string("name");
        t.string("type");
        t.string("class");
        t.boolean("recycle");
        t.list.field("lights",  {
            type: PhilipsHueLightType,
            async resolve(...params){
                return lightResolver(...params);
            }
        });
        // t.string("sensors");
        // t.string("state");
        // t.string("action");

    }
});

export default PhilipsHueGroupsType;

const lightResolver = async ({lights, bridgeId}) => {
    return await lightsLoader.load({lightIds: lights, bridgeId});
}