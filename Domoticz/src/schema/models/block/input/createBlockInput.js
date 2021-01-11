import { inputObjectType } from "nexus";

const createBlockInput = inputObjectType({
    name: "createBlockInput",
    definition(t) {
      t.string("title", { required: true, type: String });
      t.string("description", { type: String });
    },
});

export default createBlockInput;