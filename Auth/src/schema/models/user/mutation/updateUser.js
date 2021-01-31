import { ForbiddenError } from "apollo-server-express";

import UserType from "../type/user";
import {AuthenticationError} from "apollo-server-express";
import {getUserById} from "../utils";
import {updateOneById} from "../../../../core/mongo";
import { arg, stringArg } from "nexus";
import TypeEnum from "../enum/typeEnum";

export default (t) => 
    t.field("updateUser", {
        type: UserType,
        args: {
            name: stringArg({required: true}),
            type: arg({type: TypeEnum, required: true}),
        },
        async resolve(...params){
            return await updateUser(...params);
        }
    });

const updateUser = async (_, {name, type}, {currentUser}) => {
    try {
        const user = await getUserById(currentUser._id);

        if (!user?._id) {
            throw new AuthenticationError("connect.updateUser.errors.notFound");
        }

        const userData = await updateOneById("users", user._id, {
            $set: {
                name,
                type,
            }
        });
        
        if(userData && userData._id){
            return userData;
        }

        throw new Error("connect.updateUser.updateUser")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}