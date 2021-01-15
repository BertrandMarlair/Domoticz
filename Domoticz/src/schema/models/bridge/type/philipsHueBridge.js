import { objectType } from "nexus";
import PhilipsHueBridgeDetailsType from "./philipsHueBridgeDetailsType";

const PhilipsHueBridgeType = objectType({
    name: "PhilipsHueBridge",
    definition(t) {
        t.id("_id");
        t.id("providerId");
        t.string("ipAddress");
        t.string("token", {nullable: true});
        t.field("details", {type: PhilipsHueBridgeDetailsType})
    }
});

export default PhilipsHueBridgeType;