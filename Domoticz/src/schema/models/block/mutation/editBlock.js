import { ForbiddenError } from "apollo-server-express";
import BlockType from "../type/block";
import {DBBlocks} from "../index";

import {getBlockById} from "../utils";
import {updateOneById} from "../../../../core/mongo";
import { arg } from "nexus";
import editBlockInput from "../input/editBlockInput";

export default (t) => 
    t.field("editBlock", {
        type: BlockType,
        args: {
            block: arg({required: true, type: editBlockInput})
        },
        async resolve(...params){
            return await editBlock(...params);
        }
    });

const editBlock = async (_, {block: editBlockInput}) => {
    try {

        if (editBlockInput?.title.length < 2) {
            throw new Error("error.validation.titleIsTooSmall");
        }
        
        const block = await getBlockById(editBlockInput.id);

        if (!block) {
            throw new Error("contexttest.editBlock.errors.noBlockFound");
        }

        const blockData = await updateOneById(DBBlocks, editBlockInput.id, {
            $set: {
                title: editBlockInput.title,
                description: editBlockInput.description,
                updatedAt: new Date(),
            }
        });
        
        if(blockData && blockData._id){
            return blockData;
        }

        throw new Error("contexttest.editBlock.failedToEditBlock")
    } catch (err) {
        throw new ForbiddenError(err)
    }
}