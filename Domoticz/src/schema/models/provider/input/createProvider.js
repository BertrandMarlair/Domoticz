import { inputObjectType } from "nexus";

const createProviderInput = inputObjectType({
    name: "createProviderInput",
    definition(t) {
      t.string("title", { required: true });
      t.string("description", { required: true });
      t.string("slug", { required: true });
      t.string("icon", { required: true });
    },
});

export default createProviderInput;