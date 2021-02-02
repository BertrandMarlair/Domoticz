import registerInput from "./input/register";
import UserType from "./type/user";
import LoginType from "./type/loginType";
import getCurrentUser from "./query/getCurrentUser";
import login from "./mutation/login";
import TypeEnum from "./enum/typeEnum";
import checkAuthUser from "./query/checkAuthUser";
import getAllUsers from "./query/getAllUsers";
import getUserById from "./query/getUserById";
import signin from "./mutation/signin";
import updateUser from "./mutation/updateUser";
import deleteUser from "./mutation/deleteUser";
import editUser from "./mutation/editUser";
import resetUserPwd from "./mutation/resetUserPwd";
import accountEditType from "./mutation/accountEditType";
import userSubscription from "./subscription/user";

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
        editUser,
        resetUserPwd,
        accountEditType,
    ],
    query: [
        getCurrentUser,
        checkAuthUser,
        getAllUsers,
        getUserById,
    ],
    input: [
        registerInput,
    ],
    enum: [
        TypeEnum,
    ],
    subscription: [
        userSubscription,
    ]
};
