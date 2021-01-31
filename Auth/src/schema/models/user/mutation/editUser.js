import UserType from "../type/user";
import {DBUsers} from "../index";

import {getUserById} from "../utils";
import {getUserByName} from "../utils";
import {updateOneById} from "../../../../core/mongo";
import { booleanArg, idArg, stringArg } from "nexus";

export default (t) => 
    t.field("editUser", {
        type: UserType,
        args: {
            _id: idArg({required: true}),
            name: stringArg({required: true}),
            active: booleanArg({required: true}),
            verified: booleanArg({required: true}),
        },
        async resolve(...params){
            return await editUser(...params);
        }
    });

const editUser = async (_, {_id, name, active, verified}) => {

    if (name.length < 2) {
        throw new Error("error.validation.nameIsTooSmall");
    }

    const user = await getUserByName(name);

    if (user && user._id != _id) {
        throw new Error("alreadyRegistered");
    }

    const userToEdit = await getUserById(_id);

    if (!userToEdit) {
        throw new Error("noUserFound");
    }

    const userData = await updateOneById(DBUsers, _id, {
        $set: {
            name: name,
            active: active,
            basic : {
                verified: verified,
            },
        }
    });
    
    if(userData && userData._id){
        return userData;
    }

    throw new Error("failedToEditUser")

}