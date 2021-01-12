import { objectType } from "nexus";

const BlockType = objectType({
    name: "Block",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("title");
        t.string("description");
    }
});

export default BlockType;