import {syncPhilipsHue} from "../syncStatus/syncPhilipsHue";
import {getWeather} from "../weather/getWeather";

const cronJob = () => {
    syncPhilipsHue();
    getWeather();
}

export default cronJob;