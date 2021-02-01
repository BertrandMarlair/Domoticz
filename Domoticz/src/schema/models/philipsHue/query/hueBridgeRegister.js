import BridgeStatusType from "../type/bridge/philipsHueBridgeStatus";
import { HueBridgeRegister } from "../../../../core/philips";
import { stringArg } from "nexus";
import { insertOne, queryOne } from "../../../../core/mongo";
import { DBProvider } from "../../provider";
import { DBBridges } from "../index";

export default (t) => 
    t.field("hueBridgeRegister", {
        type: BridgeStatusType,
        nullable: true,
        args: {
            ipAddress: stringArg({required: true}),
            name: stringArg({required: true}),
        },
        async resolve(...params) {
            return await hueBridgeRegister(...params)
        },
    });


const hueBridgeRegister = async (_, {ipAddress, name}) => {
    const res = await HueBridgeRegister(ipAddress, name);

    const bridge = await queryOne(DBBridges, {name}) ;

    if (bridge) {
        throw new Error("This bridge is already added")
    }
    
    if (res?.data?.[0]) {
        const data = res?.data?.[0];
        if (data?.error?.description === "link button not pressed") {
            return {
                ok: false,
                error: data.error.description,
            }
        }
        if (data.success) {
            const provider = await queryOne(DBProvider, {slug: "philips_hue"});

            await insertOne(DBBridges, {
                providerId: provider._id,
                ipAddress,
                token: data.success.username,
            });

            return {
                ok: true,
            }
        }
        throw new Error("Fail to get information from the bridge.")
    }
    
    throw new Error("Fail to get information from the bridge.")
}