import { objectType } from "nexus";

const PhilipsHueGroupsStateType = objectType({
    name: "PhilipsHueGroupsState",
    definition(t) {
        t.boolean("all_on");
        t.boolean("any_on");
    }
});

export default PhilipsHueGroupsStateType;
