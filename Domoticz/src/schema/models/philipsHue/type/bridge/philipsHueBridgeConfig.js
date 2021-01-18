import { objectType } from "nexus";

const PhilipsHueBridgeDetailsType = objectType({
    name: "PhilipsHueBridgeDetailsType",
    definition(t) {
        t.string("name");
        t.string("datastoreversion");
        t.string("swversion");
        t.string("apiversion");
        t.string("mac");
        t.string("bridgeid");
        t.boolean("factorynew");
        t.string("replacesbridgeid", {nullable: true});
        t.string("modelid");
        t.string("starterkitid");
    }
});

export default PhilipsHueBridgeDetailsType;