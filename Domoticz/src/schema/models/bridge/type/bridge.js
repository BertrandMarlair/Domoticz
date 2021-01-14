import { objectType } from "nexus";

const BridgeType = objectType({
    name: "Bridge",
    definition(t) {
        t.id("_id");
        t.id("providerId");
        t.string("ipAddress");
        t.string("token", {nullable: true});
        t.string("name", {nullable: true});
    }
});

export default BridgeType;