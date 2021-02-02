import {withFilter} from "graphql-subscriptions";
import { subscriptionField } from "nexus";
import pubsub from "../../../../core/pubsub";
import BasicType from "../type/basic";

export default subscriptionField("user", {
    type: BasicType,
    subscribe: withFilter(
        () => pubsub.asyncIterator("NONE"),
        async () => {
           return true;
        },
    ),
    resolve: payload => {
        return payload;
    }
});