import SyncAllType from "./type/syncAll";
import SyncAll from "./query/syncAll";
import syncAllSubscription from "../sync/subscription/syncAll";

export const DBBridges = "Bridges";

export default {
    type: [
        SyncAllType,
    ],
    query: [
        SyncAll,
    ],
    subscription: [
        syncAllSubscription,
    ]
};