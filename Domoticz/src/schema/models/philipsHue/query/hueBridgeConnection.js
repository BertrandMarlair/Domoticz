import PhilipsHueBridgeStatusType from "../type/bridge/philipsHueBridgeStatus";
import { HueBridgeConnection } from "../../../../core/philips";
import { stringArg } from "nexus";

export default (t) => 
    t.field("hueBridgeConnection", {
        type: PhilipsHueBridgeStatusType,
        nullable: true,
        args: {
            ipAddress: stringArg({required: true}),
        },
        async resolve(...params) {
            return await hueBridgeConnection(...params)
        },
    });


const hueBridgeConnection = async (_, {ipAddress}) => {
    const res = await HueBridgeConnection(ipAddress);

    if (res?.data?.bridgeid) {
        return {
            ok: true, 
            bridgeId: res.data.bridgeid
        }
    }
    return {ok: false}
}