import { objectType } from "nexus";

const Basic = objectType({
    name: "Basic",
    definition(t) {
        t.boolean("verified", { nullable: false });
        t.timestamp("lastLogin", {nullable: true});
    }
});

export default Basic;