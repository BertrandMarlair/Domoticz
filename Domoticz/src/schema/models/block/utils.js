import {queryOne, queryOneById} from "../../../core/mongo";

export const getBlockById = async _id => {
    return await queryOneById("blocks", _id);
};

export const getBlockByTitle = async name => {
    return await queryOne("blocks", {name});
};
