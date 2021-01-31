import { DBWeather } from "..";
import { query } from "../../../../core/mongo";
import WeatherType from "../type/weather";

export default (t) => 
    t.field("getWeatherInfo", {
        type: WeatherType,
        nullable: true,
        async resolve(...params){
            return await getWeatherInfo(...params);
        }
    });

const getWeatherInfo = async () => {
    const weather = await query(DBWeather, {});

    if (!weather?.[0]?._id) {
        return null;
    }

    return weather[0];
}