import {queryOne, queryOneById, updateOneById} from "../../../core/mongo";
import {DBUsers} from "./index";

export const getUserById = async _id => {
    return await queryOneById(DBUsers, _id);
};

export const getUserByName = async name => {
    return await queryOne(DBUsers, {name});
};

export const updateUserById = async (_id, updateValue) => {
    return await updateOneById(DBUsers, _id, updateValue);
};
