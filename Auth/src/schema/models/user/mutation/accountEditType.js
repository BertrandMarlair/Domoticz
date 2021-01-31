import UserType from "../type/user";
import {DBUsers} from "../index";

import {getUserById} from "../utils";
import {updateOneById} from "../../../../core/mongo";
import { idArg, stringArg } from "nexus";
import TypeEnum from "../enum/typeEnum";

export default (t) => 
    t.field("accountTypeUpdate", {
        type: UserType,
        args: {
            _id: idArg({required: true}),
            type: stringArg({required: true, type: TypeEnum}),
        },
        async resolve(...params){
            return await accountTypeUpdate(...params);
        }
    });

const accountTypeUpdate = async (_, {_id, type}) => {

    const userToEdit = await getUserById(_id);

    if (!userToEdit) {
        throw new Error("noUserFound");
    }

    const userData = await updateOneById(DBUsers, _id, {
        $set: {
            type: type,
        }
    });
    
    if(userData && userData._id){
        return userData;
    }

    throw new Error("failedToEditUser")

}