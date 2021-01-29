import { DBBridges } from ".";
import { updateManyById } from "../../../core/mongo";
import { QueryAllHueBridge } from "../../../core/philips";

export const syncHueToDB = async () => {
    const bridgesStatus = await QueryAllHueBridge();

    if (bridgesStatus.length > 0) {
        for (let bridge of bridgesStatus) {
            if (bridge?.value?.data) {
                const {data, _id} = bridge.value;

                await updateManyById(DBBridges, _id, {
                    $set: {...data}
                });
            }
        }
    }
}