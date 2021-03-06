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
import PhilipsHueGroupsStateType from "./type/groups/philipsHueGroupsState";
import PhilipsHueStateInput from "./input/philipsHueState";
import editGroupState from "./mutation/light/editGroupState";
import editGroupStateWhitoutSync from "./mutation/light/editGroupStateWhitoutSync";
import editLightState from "./mutation/light/editLightState";
import editLightStateWhitoutSync from "./mutation/light/editLightStateWhitoutSync";
import philipsHueSceneType from "./type/scnene/philipsHueScene";
import getScenesByGroup from "./query/getScenesByGroup";
import PhilipsHueSceneLightStateType from "./type/scnene/philipsHueSceneLightStateType";
import hueBridgeAddConnection from "./query/hueBridgeAddConnection";
import editBridgeName from "./mutation/bridge/editBridgeName";
import deleteBridge from "./mutation/bridge/deleteBridge";
import editGroupConfig from "./mutation/group/editGroupConfig";
import addGroup from "./mutation/group/addGroup";
import deleteGroup from "./mutation/group/deleteGroup";
import editLightName from "./mutation/light/editLightName";
import deleteLight from "./mutation/light/deleteLight";

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
        PhilipsHueGroupsStateType,
        philipsHueSceneType,
        PhilipsHueSceneLightStateType,
    ],
    query: [
        getPhilipsHueDevices,
        hueBridgeConnection,
        hueBridgeRegister,
        getScenesByGroup,
        hueBridgeAddConnection,
    ],
    mutation: [
        editGroupState,
        editGroupStateWhitoutSync,
        editLightState,
        editLightStateWhitoutSync,
        editBridgeName,
        deleteBridge,
        editGroupConfig,
        addGroup,
        deleteGroup,
        editLightName,
        deleteLight,
    ],
    input: [
        PhilipsHueStateInput,
    ],
};