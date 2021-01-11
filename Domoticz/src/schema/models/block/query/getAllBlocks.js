import BlockType from "../type/block";

export default (t) => 
    t.list.field("getAllBlocks", {
        type: BlockType,
        nullable: true,
        async resolve(...params) {
            return await getAllBlocks(...params)
        },
    });


const getAllBlocks = async () => {
    return [
        {
            _id: "891374917391",
            title: "Domotics",
            description: "this is a test",
        },
        {
            _id: "891374917392",
            title: "Jeedmon",
            description: "this is a test",
        }
    ];
}