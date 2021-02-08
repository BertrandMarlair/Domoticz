import { objectType } from "nexus";
import PhilipsHueBridgeConfigType from "./philipsHueBridgeConfig";
import PhilipsHueGroupsType from "../groups/philipsHueGroups";
import PhilipsHueLightType from "../lights/philipsHueLight";

const PhilipsHueBridgeType = objectType({
    name: "PhilipsHueBridge",
    definition(t) {
        t.id("_id");
        t.id("providerId");
        t.string("ipAddress");
        t.string("name");
        t.string("token", {nullable: true});
        t.field("config", {type: PhilipsHueBridgeConfigType})
        t.list.field("groups", {
            type: PhilipsHueGroupsType, 
            async resolve(...params){
                return groupsResolver(...params);
            }
        })
        t.list.field("lights", {
            type: PhilipsHueLightType, 
            async resolve(...params){
                return lightsResolver(...params);
            }
        })
    }
});

export default PhilipsHueBridgeType;

const groupsResolver = async ({_id, groups}) => {
    return Object.keys(groups).map((l) => ({...groups[l], bridgeId: _id, groupId: l})).filter((g) => g.type === "Zone");
}

const lightsResolver = async ({_id, lights}) => {
    return Object.keys(lights).map((l) => ({...lights[l], bridgeId: _id, lightId: l}));
}
