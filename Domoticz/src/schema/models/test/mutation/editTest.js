import TestType from "../type/test";

export default (t) => 
    t.field("editTest", {
        type: TestType,
        async resolve(...params){
            return await editTest(...params);
        }
    });

const editTest = async () => {
    return {};
}