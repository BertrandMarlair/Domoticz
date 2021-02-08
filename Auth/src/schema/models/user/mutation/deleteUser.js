import UserType from "../type/user";
import {DBUsers} from "../index";
import {deleteOneById} from "../../../../core/mongo";
import {getUserById} from "../utils";
import { idArg, stringArg } from "nexus";

export default (t) => 
    t.field("deleteUser", {
        type: UserType,
        args: {
            _id: idArg({required: true}),
            name: stringArg({required: true}),
        },
        async resolve(...params){
            return await deleteUser(...params);
        }
    });

const deleteUser = async (_, {_id, name}) => {
    const userToDelete = await getUserById(_id);

    if (!userToDelete) {
        throw new Error("contexttest.deleteBlock.errors.noBlockFound");
    }

    if(userToDelete.name != name){
        throw new Error("contexttest.deleteBlock.errors.notsamename");
    }

    await deleteOneById(DBUsers, _id);

    console.log("------blockToDelete-------")

    console.log(userToDelete);

    return userToDelete;
}