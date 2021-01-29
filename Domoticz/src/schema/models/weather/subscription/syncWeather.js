import {withFilter} from "graphql-subscriptions";
import { subscriptionField } from "nexus";
import {PUBSUB_TYPES} from "../../../../core/constants";
import pubsub from "../../../../core/pubsub";
import WeatherType from "../type/weather";

export default subscriptionField("syncWeather", {
    type: WeatherType,
    subscribe: withFilter(
        () => pubsub.asyncIterator(PUBSUB_TYPES.SYNC_WHEATER),
        async () => {
           return true;
        },
    ),
    resolve: payload => {
        return payload;
    }
});