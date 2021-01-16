import {CronJob} from "cron"
import { DBBridges } from "../../schema/models/philipsHue";
import { QueryAllHueBridge } from "../philips";
import { queryOne, updateManyById } from "../mongo";
import pubsub from "../pubsub";
import { PUBSUB_TYPES } from "../constants";
import { DBProvider } from "../../schema/models/provider";
//////////// RUN EVERY 5 SECONDS

export const syncPhilipsHue = () => {
    const syncPhilipsHueCronJob = new CronJob('*/15 * * * * *', async () => {
        console.log("RUN 5 SECONDS");
        const bridgesStatus = await QueryAllHueBridge();

        let bridesIds = [];

        for (let bridge of bridgesStatus) {
            if (bridge?.value?.data) {
                const details = bridge.value;
                bridesIds.push(details._id);
                await updateManyById(DBBridges, details._id, {
                    $set: {...details.data}
                });
            }
        }

        const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

        pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    }, null, true, "Europe/Brussels");

    syncPhilipsHueCronJob.start();
}
