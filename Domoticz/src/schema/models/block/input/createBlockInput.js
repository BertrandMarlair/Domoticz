import { inputObjectType } from "nexus";

const createBlockInput = inputObjectType({
    name: "createBlockInput",
    definition(t) {
      t.string("title", { required: true});
      t.string("description");
    },
});

export default createBlockInput;