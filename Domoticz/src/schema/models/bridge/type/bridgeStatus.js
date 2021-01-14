import { objectType } from "nexus";

const BridgeStatusType = objectType({
    name: "BridgeStatus",
    definition(t) {
        t.boolean("ok");
        t.string("error", {nullable: true});
        t.string("bridgeId", {nullable: true});
    }
});

export default BridgeStatusType;