import {syncPhilipsHue} from "../syncStatus/syncPhilipsHue";

const cronJob = () => {
    syncPhilipsHue();
}

export default cronJob;