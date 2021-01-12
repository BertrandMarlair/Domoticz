import { idArg } from "nexus";
import { DBProvider } from "..";
import { queryOneById, deleteById } from "../../../../core/mongo";
import ProviderType from "../type/provider";

export default (t) => 
    t.field("deleteProvider", {
        type: ProviderType,
        args: {
            _id: idArg({required: true}),
        },
        async resolve(...params){
            return await deleteProvider(...params);
        }
    });

const deleteProvider = async (_, {_id}) => {
    const oldProvider = await queryOneById(DBProvider, _id);

    if (!oldProvider) {
        throw new Error("provider.edit.errors.notFound");
    }

    await deleteById(DBProvider, _id);

    console.log(oldProvider);

    return oldProvider;
}