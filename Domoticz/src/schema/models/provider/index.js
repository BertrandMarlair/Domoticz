import ProviderType from "./type/provider";
import getAllProviders from "./query/getAllProviders";
import editProvider from "./mutation/editProvider";
import editProviderInput from "./input/editProvider";
import createProviderInput from "./input/createProvider";
import deleteProvider from "./mutation/deleteProvider";
import createProvider from "./mutation/createProvider";

export const DBProvider = "Providers";

export default {
    type: [
        ProviderType,
    ],
    query: [
        getAllProviders,
    ],
    mutation: [
        createProvider,
        editProvider,
        deleteProvider,
    ],
    input: [
        editProviderInput,
        createProviderInput,
    ]
};