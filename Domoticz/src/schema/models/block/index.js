import BlockType from "./type/block";
import getAllBlocks from "./query/getAllBlocks";
import createBlock from "./mutation/createBlock";
import createBlockInput from "./input/createBlockInput";

export default {
    type: [
        BlockType,
    ],
    query: [
        getAllBlocks,
    ],
    mutation: [
        createBlock,
    ],
    input: [
        createBlockInput,
    ],
};