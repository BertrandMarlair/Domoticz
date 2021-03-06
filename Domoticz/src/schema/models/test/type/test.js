import { objectType } from "nexus";

const TestType = objectType({
    name: "Test",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("title");
        t.string("description");
    }
});

export default TestType;