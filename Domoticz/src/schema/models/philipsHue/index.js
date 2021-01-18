import PhilipsHueType from "./type/philipsHue";
import getPhilipsHueDevices from "./query/getPhilipsHueDevices";
import hueBridgeConnection from "./query/hueBridgeConnection";
import hueBridgeRegister from "./query/hueBridgeRegister";
import PhilipsHueBridgeType from "./type/bridge/philipsHueBridge";
import BridgeStatusType from "./type/bridge/philipsHueBridgeStatus";
import PhilipsHueBridgeConfigType from "./type/bridge/philipsHueBridgeConfig";
import PhilipsHueBridgeStatusType from "./type/bridge/philipsHueBridgeStatus";
import PhilipsHueLightType from "./type/lights/philipsHueLight";
import PhilipsHueLightStateType from "./type/lights/philipsHueLightState";
import PhilipsHueLightXYType from "./type/lights/philipsHueLightXY";
import PhilipsHueSensorType from "./type/sensor/philipsHueSensor";

export const DBBridges = "Bridges";

export default {
    type: [
        PhilipsHueType,
        PhilipsHueBridgeType,
        BridgeStatusType,
        PhilipsHueBridgeConfigType,
        PhilipsHueBridgeStatusType,
        PhilipsHueLightType,
        PhilipsHueLightStateType,
        PhilipsHueLightXYType,
        PhilipsHueSensorType,
    ],
    query: [
        getPhilipsHueDevices,
        hueBridgeConnection,
        hueBridgeRegister,
    ],
};