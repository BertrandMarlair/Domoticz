import { objectType } from "nexus";

const PhilipsHueLightXYType = objectType({
    name: "PhilipsHueLightXY",
    definition(t) {
        t.float("x", {nullable: true,});
        t.float("y", {nullable: true,});
    }
});

export default PhilipsHueLightXYType;