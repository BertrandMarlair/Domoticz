import { objectType } from "nexus";
import { DBBridges } from "../..";
import { queryOneById } from "../../../../../core/mongo";
import { QueryHueBridge } from "../../../../../core/philips";
import lightsLoader from "../../dataLoader/lightsLoader";
import PhilipsHueLightType from "../lights/philipsHueLight";
import PhilipsHueSceneLightStateType from "./philipsHueSceneLightStateType";

const philipsHueSceneType = objectType({
    name: "philipsHueScene",
    definition(t) {
        t.id("bridgeId");
        t.id("sceneId");
        t.string("name");
        t.string("group");
        t.string("type");
        t.list.field("lights",  {
            type: PhilipsHueLightType,
            async resolve(...params){
                return lightResolver(...params);
            }
        });
        t.list.field("lightstates",  {
            type: PhilipsHueSceneLightStateType,
            async resolve(...params){
                return lightStatesResolver(...params);
            }
        });
    }
});

export default philipsHueSceneType;

const lightResolver = async ({lights, bridgeId}) => {
    return await lightsLoader.load({lightIds: lights, bridgeId});
}

const lightStatesResolver = async ({sceneId, bridgeId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    const res = await QueryHueBridge("GET", `scenes/${sceneId}`, bridge);

    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(sceneId)
    console.log(Object.keys(res.data.lightstates).map((s) => ({...res.data.lightstates[s], bridgeId, lightId: s})));
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$")

    return Object.keys(res.data.lightstates).map((s) => ({...res.data.lightstates[s], bridgeId, lightId: s}));
}