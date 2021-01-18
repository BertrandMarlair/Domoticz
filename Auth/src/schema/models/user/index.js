import registerInput from "./input/register";
import signin from "./mutation/signin";
import UserType from "./type/user";
import LoginType from "./type/loginType";
import getCurrentUser from "./query/getCurrentUser";
import login from "./mutation/login";
import TypeEnum from "./enum/typeEnum";
import editUserInput from "./input/editUser";
import checkAuthUser from "./query/checkAuthUser";
import getAllUsers from "./query/getAllUsers";

export default {
    type: [
        UserType,
        LoginType,
    ],
    mutation: [
        signin,
        login,
    ],
    query: [
        getCurrentUser,
        checkAuthUser,
        getAllUsers,
    ],
    input: [
        registerInput,
        editUserInput,
    ],
    enum: [
        TypeEnum,
    ]
};
