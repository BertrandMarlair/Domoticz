import {syncPhilipsHue} from "../syncStatus/syncPhilipsHue";
import {syncWeather} from "../weather/syncWeather";

const cronJob = () => {
    syncPhilipsHue();
    syncWeather();
}

export default cronJob;