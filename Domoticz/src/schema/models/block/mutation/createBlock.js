import { ForbiddenError } from "apollo-server-express";
import BlockType from "../type/block";
import {DBBlocks} from "../index";

import {getBlockByTitle} from "../utils";
import {insertOne} from "../../../../core/mongo";
import { arg } from "nexus";
import createBlockInput from "../input/createBlockInput";

export default (t) => 
    t.field("createBlock", {
        type: BlockType,
        args: {
            block: arg({required: true, type: createBlockInput})
        },
        async resolve(...params){
            return await createBlock(...params);
        }
    });

const createBlock = async (_, {block: createBlockInput}) => {
    try {
        
        if (createBlockInput?.title.length < 2) {
            throw new Error("error.validation.titleIsTooSmall");
        }
        
        const block = await getBlockByTitle(createBlockInput.title);

        if (block) {
            throw new Error("contexttest.createBlock.errors.alreadyCreated");
        }

        const blockData = await insertOne(DBBlocks, {
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