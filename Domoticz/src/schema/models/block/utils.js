import {queryOne, queryOneById} from "../../../core/mongo";
import {DBBlocks} from "./index";

export const getBlockById = async _id => {
    return await queryOneById(DBBlocks, _id);
};

export const getBlockByTitle = async title => {
    return await queryOne(DBBlocks, {title});
};
