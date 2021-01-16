import { objectType } from "nexus";

const PhilipsHueBridgeStatusType = objectType({
    name: "PhilipsHueBridgeStatus",
    definition(t) {
        t.boolean("ok");
        t.string("error", {nullable: true});
        t.string("bridgeId", {nullable: true});
    }
});

export default PhilipsHueBridgeStatusType;