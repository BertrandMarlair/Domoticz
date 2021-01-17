import {query} from "../../../core/mongo";
import UserType from "../type/user";


export default (t) => 
    t.field("getAllUsers", {
        type: UserType,
        nullable: false,
        async resolve(...params){
            return await getAllUsers(...params);
        }
    });


const getAllUsers = async () => {
    return await query('Users', {});
}
