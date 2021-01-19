import BlockType from "./type/block";
import getAllBlocks from "./query/getAllBlocks";
import createBlock from "./mutation/createBlock";
import createBlockInput from "./input/createBlockInput";
import editBlock from "./mutation/editBlock";
import deleteBlock from "./mutation/deleteBlock";
import editBlockInput from "./input/editBlockInput";

export const DBBlocks = "Blocks";

export default {
    type: [
        BlockType,
    ],
    query: [
        getAllBlocks,
    ],
    mutation: [
        createBlock,
        editBlock,
        deleteBlock,
    ],
    input: [
        createBlockInput,
        editBlockInput,
    ],
};