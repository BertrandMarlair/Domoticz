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
    t.field("editGroupConfig", {
        type: PhilipsHueType,
        args: {
            bridgeId: idArg({required: true}),
            groupId: idArg({required: true}),
            name: stringArg({required: true}),
            class: stringArg({required: true}),
            lights: idArg({required: true, list: true}),
        },
        async resolve(...params){
            return await editGroupConfig(...params);
        }
    });

const editGroupConfig = async (_, {bridgeId, groupId, name, class: className, lights}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    await QueryHueBridge("PUT", `groups/${groupId}`, bridge, {name, lights, class: className});

    await syncHueToDB();

    const philipsHue = await queryOne(DBProvider, {slug: "philips_hue"});

    pubsub.publish(PUBSUB_TYPES.SYNC_PHILIPS_HUE, {philipsHue});

    return philipsHue;
}