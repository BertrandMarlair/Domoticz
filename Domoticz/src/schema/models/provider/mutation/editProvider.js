import { arg } from "nexus";
import { DBProvider } from "..";
import { queryOneById, updateOneById } from "../../../../core/mongo";
import editProviderInput from "../input/editProvider";
import ProviderType from "../type/provider";

export default (t) => 
    t.field("editProvider", {
        type: ProviderType,
        args: {
            provider: arg({type: editProviderInput, required: true}),
        },
        async resolve(...params){
            return await editProvider(...params);
        }
    });

const editProvider = async (_, {provider}) => {
    const oldProvider = await queryOneById(DBProvider, provider._id);

    if (!oldProvider) {
        throw new Error("provider.edit.errors.notFound");
    }

    const newProvider = await updateOneById(DBProvider, provider._id, {$set: {...provider}});

    console.log(newProvider);

    return newProvider;
}