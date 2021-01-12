import { DBProvider } from "..";
import { query } from "../../../../core/mongo";
import ProviderType from "../type/provider";

export default (t) => 
    t.list.field("getAllProviders", {
        type: ProviderType,
        nullable: true,
        async resolve(...params) {
            return await getAllProviders(...params)
        },
    });


const getAllProviders = async () => {
    return await query(DBProvider, {});
}