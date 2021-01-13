import BlockType from "../type/block";
import {DBBlocks} from "../index";
import {query} from "../../../../core/mongo";

export default (t) => 
    t.list.field("getAllBlocks", {
        type: BlockType,
        nullable: true,
        async resolve(...params) {
            return await getAllBlocks(...params)
        },
    });


const getAllBlocks = async () => {
    const blocksData = await query(DBBlocks, {});
    
    if(blocksData){
        return blocksData;
    }
}