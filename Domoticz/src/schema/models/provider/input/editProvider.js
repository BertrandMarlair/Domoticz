import { inputObjectType } from "nexus";

const editProviderInput = inputObjectType({
    name: "editProviderInput",
    definition(t) {
      t.id("_id", { required: true });
      t.string("title", { required: true });
      t.string("description", { required: true });
      t.string("slug", { required: true });
      t.string("icon", { required: true });
      t.string("button", { required: true });
    },
});

export default editProviderInput;