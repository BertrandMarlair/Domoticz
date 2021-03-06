import { arg, idArg } from "nexus";
import { DBBridges } from "../..";
import {queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import PhilipsHueStateInput from "../../input/philipsHueState";
import ResponseType from "../../../../commons/type/Response";

export default (t) => 
    t.field("editGroupStateWhitoutSync", {
        type: ResponseType,
        args: {
            bridgeId: idArg({required: true}),
            groupId: idArg({required: true}),
            state: arg({required: true, type: PhilipsHueStateInput}),
        },
        async resolve(...params){
            return await editGroupStateWhitoutSync(...params);
        }
    });

const editGroupStateWhitoutSync = async (_, {bridgeId, groupId, state}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("bridge not found");
    }

    QueryHueBridge("PUT", `groups/${groupId}/action`, bridge, state);

    return {
        ok: true,
    };
}