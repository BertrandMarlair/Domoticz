import { ForbiddenError } from "apollo-server-express";
import BlockType from "../type/block";

import {getBlockByTitle} from "../utils";
import {insertOne} from "../../../../core/mongo";

export default (t) => 
    t.field("createBlock", {
        type: BlockType,
        async resolve(...params){
            return await createBlock(...params);
        }
    });

const createBlock = async (_, {block: createBlockInput}) => {
    try {
        const block = await getBlockByTitle(createBlockInput.title)

        if (block) {
            throw new Error("contexttest.createBlock.errors.alreadyCreated");
        }
        
        if (createBlockInput?.title.length < 8) {
            throw new Error("error.validation.titleIsTooSmall");
        }

        const blockData = await insertOne("blocks", {
            title: createBlockInput.title,
            description: createBlockInput.description,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        if(blockData && blockData._id){
            return blockData;
        }

        throw new Error("contexttest.createBlock.failedToCreateBlock")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}