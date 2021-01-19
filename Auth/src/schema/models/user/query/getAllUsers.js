import {query} from "../../../../core/mongo";
import UserType from "../type/user";

export default (t) => 
    t.list.field("getAllUsers", {
        type: UserType,
        nullable: true,
        async resolve(...params){
            return await getAllUsers(...params);
        }
    });


const getAllUsers = async () => {
    const usersData = await query('users', {});

    return usersData;
}
