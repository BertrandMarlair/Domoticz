import BridgeType from "./type/bridge";
import BridgeStatusType from "./type/bridgeStatus";

export const DBBridges = "Bridges"

export default {
    type: [
        BridgeType,
        BridgeStatusType,
    ],
};