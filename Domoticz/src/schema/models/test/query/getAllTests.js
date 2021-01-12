import TestType from "../type/test";

export default (t) => 
    t.list.field("getAllTests", {
        type: TestType,
        nullable: true,
        async resolve(...params) {
            return await getAllTest(...params)
        },
    });


const getAllTest = async () => {
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