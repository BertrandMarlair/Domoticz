import { inputObjectType } from "nexus";

const editBlockInput = inputObjectType({
    name: "editBlockInput",
    definition(t) {
      t.string("id", { required : true });
      t.string("title", { required: true });
      t.string("description");
    },
});

export default editBlockInput;