import {withFilter} from "graphql-subscriptions";
import { subscriptionField } from "nexus";
import {PUBSUB_TYPES} from "../../../../core/constants";
import pubsub from "../../../../core/pubsub";
import SyncAllType from "../type/syncAll";

export default subscriptionField("syncAll", {
    type: SyncAllType,
    subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_TYPES.SYNC_PHILIPS_HUE),
        async () => {
        // async (payload, args, {identityEmail}) => {
           return true;
        },
    ),
    resolve: payload => {
        return payload;
    }
});