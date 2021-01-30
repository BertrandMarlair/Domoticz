import UserType from "../type/user";
import { getUserById } from "../utils";
import { idArg } from "nexus";

export default (t) => 
    t.field("getUserById", {
        type: UserType,
        nullable: false,
        args: {
            _id: idArg({required: true}),
        },
        async resolve(_, args) {
            console.log(args);
            return await getUserById(args._id)
        },
    });
    