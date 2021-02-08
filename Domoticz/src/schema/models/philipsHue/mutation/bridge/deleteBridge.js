import { idArg } from "nexus";
import { DBBridges } from "../..";
import { PUBSUB_TYPES } from "../../../../../core/constants";
import { deleteOneById, queryOne, queryOneById } from "../../../../../core/mongo";
import pubsub from "../../../../../core/pubsub";
import { DBProvider } from "../../../provider";
import PhilipsHueType from "../../type/philipsHue";

export default (t) => 
    t.field("deleteBridge", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
        },
        async resolve(...params){
            return await deleteBridge(...params);
        }
    });

const deleteBridge = async (_, {bridgeId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await deleteOneById(DBBridges, bridgeId);

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}