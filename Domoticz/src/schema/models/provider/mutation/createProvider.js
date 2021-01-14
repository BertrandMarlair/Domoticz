import { arg } from "nexus";
import { DBProvider } from "..";
import { insertOne, queryOne } from "../../../../core/mongo";
import createProviderInput from "../input/createProvider";
import ProviderType from "../type/provider";

export default (t) => 
    t.field("createProvider", {
        type: ProviderType,
        args: {
            provider: arg({type: createProviderInput, required: true}),
        },
        async resolve(...params){
            return await createProvider(...params);
        }
    });

const createProvider = async (_, {provider}) => {
    const oldProvider = await queryOne(DBProvider, {slug: provider.slug});

    if (oldProvider) {
        throw new Error("provider.edit.errors.alreadyExist");
    }

    const newProvider = await insertOne(DBProvider, {...provider});

    console.log(newProvider);

    return newProvider;
}