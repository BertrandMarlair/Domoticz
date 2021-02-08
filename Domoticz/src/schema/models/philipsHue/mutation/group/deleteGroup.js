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
    t.field("deleteGroup", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            groupId: idArg({required: true}),
        },
        async resolve(...params){
            return await deleteGroup(...params);
        }
    });

const deleteGroup = async (_, {bridgeId, groupId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await QueryHueBridge("DELETE", `groups/${groupId}`, bridge);

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}