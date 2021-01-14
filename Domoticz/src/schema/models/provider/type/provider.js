import { objectType } from "nexus";

const ProviderType = objectType({
    name: "Provider",
    definition(t) {
        t.field("_id", { type: "ID" });
        t.string("title");
        t.string("slug");
        t.string("icon");
        t.string("button");
        t.string("description");
    }
});

export default ProviderType;