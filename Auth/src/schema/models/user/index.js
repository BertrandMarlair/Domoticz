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
import getUserById from "./query/getUserById";
import updateUser from "./mutation/updateUser";
import deleteUser from "./mutation/deleteUser";

export const DBUsers = "users";

export default {
    type: [
        UserType,
        LoginType,
    ],
    mutation: [
        signin,
        login,
        updateUser,
        deleteUser,
    ],
    query: [
        getCurrentUser,
        checkAuthUser,
        getAllUsers,
        getUserById,
    ],
    input: [
        registerInput,
        editUserInput,
    ],
    enum: [
        TypeEnum,
    ]
};
