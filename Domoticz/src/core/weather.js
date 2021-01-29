import Axios from "axios";

export const getWeather = async (country, city) => {
    const {RAPID_API_WEATHER_HOST, RAPID_API_KEY} = process.env;

    return await Axios.get("https://community-open-weather-map.p.rapidapi.com/weather", {
        headers: {
            "x-rapidapi-key": RAPID_API_KEY,
            "x-rapidapi-host": RAPID_API_WEATHER_HOST,
            "useQueryString": true
        }, 
        params: {
            "q": `${city},${country}`,
            "units": "metric",
        },
    })
    .then(res => res)
    .catch(res => res);
}