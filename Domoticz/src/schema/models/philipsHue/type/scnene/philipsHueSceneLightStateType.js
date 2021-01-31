import { objectType } from "nexus";
import PhilipsHueLightXYType from "../lights/philipsHueLightXY";

const PhilipsHueSceneLightStateType = objectType({
    name: "PhilipsHueSceneLightState",
    definition(t) {
        t.id("lightId");
        t.id("bridgeId");
        t.boolean("on");
        t.int("bri");
        t.int("ct", {nullable: true});
        t.field("xy", {
            type: PhilipsHueLightXYType, 
            async resolve(...params){
                return xyResolver(...params);
            }
        });
    }
});

export default PhilipsHueSceneLightStateType;

const xyResolver = async ({xy}) => {
    return {x: xy?.[0], y: xy?.[1]}
}