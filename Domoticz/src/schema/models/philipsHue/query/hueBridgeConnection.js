import BridgeStatusType from "../../bridge/type/bridgeStatus";
import { HueBridgeConnection } from "../../../../core/philips";
import { stringArg } from "nexus";

export default (t) => 
    t.field("hueBridgeConnection", {
        type: BridgeStatusType,
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