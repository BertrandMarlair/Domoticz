import TestType from "./type/test";
import getAllTests from "./query/getAllTests";
import editTest from "./mutation/editTest";

export default {
    type: [
        TestType,
    ],
    query: [
        getAllTests,
    ],
    mutation: [
        editTest,
    ]
};