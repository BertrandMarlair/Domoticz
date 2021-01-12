import ProviderType from "./type/provider";
import getAllProviders from "./query/getAllProviders";
import editProvider from "./mutation/editProvider";
import editProviderInput from "./input/editProvider";

export const DBProvider = "Providers";

export default {
    type: [
        ProviderType,
    ],
    query: [
        getAllProviders,
    ],
    mutation: [
        editProvider,
    ],
    input: [
        editProviderInput,
    ]
};