import {withFilter} from "graphql-subscriptions";
import { subscriptionField } from "nexus";
import {PUBSUB_TYPES} from "../../../../core/constants";
import pubsub from "../../../../core/pubsub";
import PhilipsHueType from "../type/philipsHue";

export default subscriptionField("syncPhilipsHue", {
    type: PhilipsHueType,
    subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_TYPES.SYNC_PHILIPS_HUE),
        async () => {
        // async (payload, args, {identityEmail}) => {
           return true;
        },
    ),
    resolve: payload => {
        return payload.philipsHue;
    }
});