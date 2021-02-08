import BlockType from "../type/block";
import {DBBlocks} from "../index";
import {deleteOneById} from "../../../../core/mongo";
import {getBlockById} from "../utils";
import { idArg } from "nexus";

export default (t) => 
    t.field("deleteBlock", {
        type: BlockType,
        args: {
            _id: idArg({required: true}),
        },
        async resolve(...params){
            return await deleteBlock(...params);
        }
    });

const deleteBlock = async (_, {_id}) => {
    const blockToDelete = await getBlockById(_id);

    if (!blockToDelete) {
        throw new Error("contexttest.deleteBlock.errors.noBlockFound");
    }

    await deleteOneById(DBBlocks, _id);

    return blockToDelete;
}