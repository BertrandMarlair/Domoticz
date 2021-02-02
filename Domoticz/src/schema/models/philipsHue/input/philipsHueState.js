import { inputObjectType } from "nexus";

const PhilipsHueStateInput = inputObjectType({
    name: "PhilipsHueStateInput",
    definition(t) {
        t.boolean("on");
        t.int("bri");
        t.int("hue");
        t.int("sat");
        t.int("ct");
        t.string("scene");
        t.list.float("xy");
    },
});

export default PhilipsHueStateInput;