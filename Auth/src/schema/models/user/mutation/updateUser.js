import { ForbiddenError } from "apollo-server-express";

import UserType from "../type/user";
import {AuthenticationError} from "apollo-server-express";
import {getUserByName} from "../utils";
import {updateOneById} from "../../../../core/mongo";
import { stringArg } from "nexus";

export default (t) => 
    t.field("signin", {
        type: UserType,
        args: {
            name: stringArg({required: true}),
            type: stringArg({required: true}),
        },
        async resolve(...params){
            return await signin(...params);
        }
    });

const signin = async (_, {name, type}, {currentUser}) => {
    try {
        const user = await getUserByName(currentUser.name)

        if (user?._id) {
            throw new AuthenticationError("connect.signin.errors.notFound");
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

        throw new Error("connect.register.failedToCreateOnPortal")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}