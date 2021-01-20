import { objectType } from "nexus";

const Basic = objectType({
    name: "Basic",
    definition(t) {
        t.boolean("verified", { nullable: false });
    }
});

export default Basic;