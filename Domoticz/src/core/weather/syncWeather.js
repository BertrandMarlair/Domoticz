import {CronJob} from "cron"
import { DBWeather } from "../../schema/models/weather";
import { query, queryOneById, updateOneById } from "../mongo";
import { getWeather } from "../weather";
import { PUBSUB_TYPES } from "../constants";
import pubsub from "../pubsub";

export const syncWeather = async () => {
    const getWeatherCronJob = new CronJob('*/15 * * * *', async () => {
        const weather = await query(DBWeather, {});

        if (weather?.[0]?._id) {
            const response = await getWeather(weather[0].country, weather[0].city);

            if (response.status === 200) {
                await updateOneById(DBWeather, weather[0]._id, {
                    $set: {...response.data}
                });
            }

            const weatherData = await queryOneById(DBWeather, weather[0]._id);

            pubsub.publish(PUBSUB_TYPES.SYNC_WHEATER, weatherData);
        }
    }, null, true, "Europe/Brussels");

    getWeatherCronJob.start();
}
