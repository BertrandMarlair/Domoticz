import { idArg, stringArg } from "nexus";
import { DBBridges } from "../..";
import { PUBSUB_TYPES } from "../../../../../core/constants";
import { queryOne, queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import pubsub from "../../../../../core/pubsub";
import { DBProvider } from "../../../provider";
import PhilipsHueType from "../../type/philipsHue";
import {syncHueToDB} from "../../utils";

export default (t) => 
    t.field("addGroup", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            name: stringArg({required: true}),
            class: stringArg({required: true}),
            lights: idArg({required: true, list: true}),
        },
        async resolve(...params){
            return await addGroup(...params);
        }
    });

const addGroup = async (_, {bridgeId, name, class: className, lights}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await QueryHueBridge("POST", `groups`, bridge, {name, lights, class: className, type: "Zone"});

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}