import { objectType } from "nexus";
import PhilipsHueLightXYType from "./philipsHueLightXY";

const PhilipsHueLightStateType = objectType({
    name: "PhilipsHueLightState",
    definition(t) {
        t.boolean("on");
        t.int("bri");
        t.int("hue", {nullable: true});
        t.int("sat", {nullable: true});
        t.string("effect", {nullable: true});
        t.field("xy", {
            type: PhilipsHueLightXYType, 
            async resolve(...params){
                return xyResolver(...params);
            }
        });
        t.string("alert");
        t.int("ct");
        t.string("colormode");
        t.string("mode");
        t.boolean("reachable");
    }
});

export default PhilipsHueLightStateType;

const xyResolver = async ({xy}) => {
    return {x: xy?.[0], y: xy?.[1]}
}