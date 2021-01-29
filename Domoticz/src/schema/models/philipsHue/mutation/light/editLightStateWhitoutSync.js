import { arg, idArg } from "nexus";
import { DBBridges } from "../..";
import {queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import PhilipsHueStateInput from "../../input/philipsHueState";
import ResponseType from "../../../../commons/type/Response";

export default (t) => 
    t.field("editLightStateWhitoutSync", {
        type: ResponseType,
        args: {
            bridgeId: idArg({required: true}),
            lightId: idArg({required: true}),
            state: arg({required: true, type: PhilipsHueStateInput}),
        },
        async resolve(...params){
            return await editLightStateWhitoutSync(...params);
        }
    });

const editLightStateWhitoutSync = async (_, {bridgeId, lightId, state}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    QueryHueBridge("PUT", `lights/${lightId}/state`, bridge, state);

    return {
        ok: true,
    };
}