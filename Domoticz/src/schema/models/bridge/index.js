import PhilipsHueBridge from "./type/philipsHueBridge";
import BridgeStatusType from "./type/bridgeStatus";
import PhilipsHueBridgeDetailsType from "./type/philipsHueBridgeDetailsType";

export const DBBridges = "Bridges"

export default {
    type: [
        PhilipsHueBridge,
        BridgeStatusType,
        PhilipsHueBridgeDetailsType,
    ],
};