import { idArg } from "nexus";
import { DBBridges } from "../..";
import { PUBSUB_TYPES } from "../../../../../core/constants";
import { queryOne, queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import pubsub from "../../../../../core/pubsub";
import { DBProvider } from "../../../provider";
import PhilipsHueType from "../../type/philipsHue";
import {syncHueToDB} from "../../utils";

export default (t) => 
    t.field("deleteLight", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            lightId: idArg({required: true}),
        },
        async resolve(...params){
            return await deleteLight(...params);
        }
    });

const deleteLight = async (_, {bridgeId, lightId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await QueryHueBridge("DELETE", `lights/${lightId}`, bridge);

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}