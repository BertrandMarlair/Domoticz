import PhilipsHueBridgeStatusType from "../type/bridge/philipsHueBridgeStatus";
import { HueBridgeConnection } from "../../../../core/philips";
import { stringArg } from "nexus";
import { queryOne } from "../../../../core/mongo";
import { DBBridges } from "..";

export default (t) => 
    t.field("hueBridgeAddConnection", {
        type: PhilipsHueBridgeStatusType,
        nullable: true,
        args: {
            ipAddress: stringArg({required: true}),
        },
        async resolve(...params) {
            return await hueBridgeAddConnection(...params)
        },
    });


const hueBridgeAddConnection = async (_, {ipAddress}) => {
    const res = await HueBridgeConnection(ipAddress);

    const bridge = await queryOne(DBBridges, {ipAddress});

    console.log(bridge);

    if (bridge) {
        throw new Error("This bridge already exist");
    }

    if (res?.data?.bridgeid) {
        return {
            ok: true, 
            bridgeId: res.data.bridgeid
        }
    }
    return {ok: false}
}