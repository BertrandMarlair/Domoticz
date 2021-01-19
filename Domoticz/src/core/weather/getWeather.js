import Axios from "axios";
import {CronJob} from "cron"
import { DBWeather } from "../../schema/models/weather";
import { query, updateOneById } from "../mongo";

export const getWeather = async () => {
    const getWeatherCronJob = new CronJob('*/15 * * * *', async () => {
        console.log("$$$$$$$$$$$$GET WEATHER$$$$$$$$$$$$$");
        const weather = await query(DBWeather, {});

        if (weather?.[0]) {
            const response = await Axios.get("https://community-open-weather-map.p.rapidapi.com/weather", {
                headers: {
                    "x-rapidapi-key": "d8eaa146f4mshb7fbb5db0689a86p140fffjsneaed4ea6a13a",
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "useQueryString": true
                }, 
                params: {
                    "q": "La louviere,be"
                },
            });

            console.log(response);

            if (response.status === 200) {
                const newWeather = await updateOneById(weather[0]._id, {
                    $set: {...response.data}
                });
    
                console.log(newWeather);
            }

        }

        console.log("$$$$$$$$$$$$GET WEATHER$$$$$$$$$$$$$");

        

    }, null, true, "Europe/Brussels");

    getWeatherCronJob.start();
}
