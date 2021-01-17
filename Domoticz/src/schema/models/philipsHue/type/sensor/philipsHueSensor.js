import { objectType } from "nexus";

const PhilipsHueSensorType = objectType({
    name: "PhilipsHueSensor",
    definition(t) {
        t.string("name");
        t.string("type");
        t.string("modelid");
        t.string("manufacturername");
        t.string("swversion");
        t.string("uniqueid");
        t.boolean("recycle");
    }
});

export default PhilipsHueSensorType;