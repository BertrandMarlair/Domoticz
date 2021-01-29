import { arg, idArg } from "nexus";
import { DBBridges } from "../..";
import { PUBSUB_TYPES } from "../../../../../core/constants";
import { queryOne, queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import pubsub from "../../../../../core/pubsub";
import { DBProvider } from "../../../provider";
import PhilipsHueStateInput from "../../input/philipsHueState";
import PhilipsHueType from "../../type/philipsHue";
import {syncHueToDB} from "../../utils";

export default (t) => 
    t.field("editLightState", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            lightId: idArg({required: true}),
            state: arg({required: true, type: PhilipsHueStateInput}),
        },
        async resolve(...params){
            return await editLightState(...params);
        }
    });

const editLightState = async (_, {bridgeId, lightId, state}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    console.log(state);

    const res = await QueryHueBridge("PUT", `lights/${lightId}/state`, bridge, state);

    console.log(res.data);

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}