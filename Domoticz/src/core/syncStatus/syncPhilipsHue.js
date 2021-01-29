import {CronJob} from "cron"
import { DBBridges } from "../../schema/models/philipsHue";
import { QueryAllHueBridge } from "../philips";
import { queryOne, updateManyById } from "../mongo";
import pubsub from "../pubsub";
import { PUBSUB_TYPES } from "../constants";
import { DBProvider } from "../../schema/models/provider";
//////////// RUN EVERY 5 SECONDS

export const syncPhilipsHue = () => {
    const syncPhilipsHueCronJob = new CronJob('*/3 * * * * *', async () => {
        const bridgesStatus = await QueryAllHueBridge();

        if (bridgesStatus.length > 0) {
            for (let bridge of bridgesStatus) {
                if (bridge?.value?.data) {
                    const {data, _id} = bridge.value;

                    await updateManyById(DBBridges, _id, {
                        $set: {...data}
                    });

                    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

                    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});
                }
            }
        }
    }, null, true, "Europe/Brussels");

    syncPhilipsHueCronJob.start();
}
