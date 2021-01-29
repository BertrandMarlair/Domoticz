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
    t.field("editGroupState", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            groupId: idArg({required: true}),
            state: arg({required: true, type: PhilipsHueStateInput}),
        },
        async resolve(...params){
            return await editGroupState(...params);
        }
    });

const editGroupState = async (_, {bridgeId, groupId, state}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await QueryHueBridge("PUT", `groups/${groupId}/action`, bridge, {...state});

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}