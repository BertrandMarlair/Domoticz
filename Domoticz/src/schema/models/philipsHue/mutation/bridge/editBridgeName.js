import { idArg, stringArg } from "nexus";
import { DBBridges } from "../..";
import { PUBSUB_TYPES } from "../../../../../core/constants";
import { queryOne, queryOneById, updateOneById } from "../../../../../core/mongo";
import pubsub from "../../../../../core/pubsub";
import { DBProvider } from "../../../provider";
import PhilipsHueType from "../../type/philipsHue";

export default (t) => 
    t.field("editBridgeName", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            name: stringArg({required: true}),
        },
        async resolve(...params){
            return await editBridgeName(...params);
        }
    });

const editBridgeName = async (_, {bridgeId, name}) => {
    console.log("bridgeId", bridgeId, name);

    await updateOneById(DBBridges, bridgeId, {
        $set: {name}
    });

    const bridge = await queryOneById(DBBridges, bridgeId);

    console.log(bridge?.config)

    if (!bridge) {
        throw new Error("bridge not found");
    }

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}