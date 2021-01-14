import PhilipsHueType from "./type/philipsHue";
import getPhilipsHueDevices from "./query/getPhilipsHueDevices";
import hueBridgeConnection from "./query/hueBridgeConnection";
import hueBridgeRegister from "./query/hueBridgeRegister";

export default {
    type: [
        PhilipsHueType,
    ],
    query: [
        getPhilipsHueDevices,
        hueBridgeConnection,
        hueBridgeRegister,
    ],
};