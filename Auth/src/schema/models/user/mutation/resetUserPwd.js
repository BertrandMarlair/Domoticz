import UserType from "../type/user";
import {DBUsers} from "../index";

import {BCRYPT_ROUNDS} from "../../../../core/constants";
import bcrypt from "bcryptjs";
import {updateOneById} from "../../../../core/mongo";
import {getUserById} from "../utils";
import { idArg, stringArg } from "nexus";

export default (t) => 
    t.field("resetUserPwd", {
        type: UserType,
        args: {
            _id: idArg({required: true}),
            password: stringArg({required: true}),
            passwordConfirmation: stringArg({required: true}),
        },
        async resolve(...params){
            return await resetUserPwd(...params);
        }
    });

const resetUserPwd = async (_, {_id, password, passwordConfirmation}) => {

    if (password !== passwordConfirmation) {
        throw new Error("auth.identity.invalidPasswordConfirmation");
    }
    
    if (password.length < 8) {
        throw new Error("error.validation.passwordIsTooSmall");
    }

    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const userToEdit = await getUserById(_id);

    const userData = await updateOneById(DBUsers, _id, {
        $set: {
            basic : {
                password: hash,
                verified: userToEdit.basic.verified,
            },
        }
    });
    
    if(userData && userData._id){
        return userData;
    }

    throw new Error("failedToEditPassword");

}