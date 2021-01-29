import updateWeatherLocation from "./mutation/updateWeatherLocation";
import getWeatherInfo from "./query/getWeatherInfo";
import syncWeather from "./subscription/syncWeather";
import WeatherType from "./type/weather";

export const DBWeather = "Weather";

export default {
    type: [
        WeatherType,
    ],
    query: [
        getWeatherInfo,
    ],
    mutation: [
        updateWeatherLocation,
    ],
    subscription: [
        syncWeather,
    ],
};