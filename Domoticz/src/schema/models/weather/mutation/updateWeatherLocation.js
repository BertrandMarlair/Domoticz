import { stringArg } from "nexus";
import { DBWeather } from "..";
import { insertOne, query, updateOneById } from "../../../../core/mongo";
import { getWeather } from "../../../../core/weather";
import WeatherType from "../type/weather";

export default (t) => 
    t.field("updateWeatherLocation", {
        type: WeatherType,
        args: {
            city: stringArg({required: true}),
            country: stringArg({required: true}),
        },
        async resolve(...params){
            return await updateWeatherLocation(...params);
        }
    });

const updateWeatherLocation = async (_, {city, country}) => {
    const weather = await query(DBWeather, {});

    const weatherInfo = await getWeather(country, city);

    if (weatherInfo.status !== 200) {
        throw new Error("City not found");
    }

    let newWeather = null;

    if (weather?.[0]?._id) {
        newWeather = await updateOneById(DBWeather, weather[0]._id, {
            $set: {city, country, ...weatherInfo.data}
        });
    } else {
        newWeather = await insertOne(DBWeather, {city, country, ...weatherInfo.data});
    }

    return newWeather;
}