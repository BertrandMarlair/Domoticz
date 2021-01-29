import { objectType } from "nexus";
import { DBBridges } from "../..";
import { queryOneById } from "../../../../../core/mongo";
import lightsLoader from "../../dataLoader/lightsLoader";
import PhilipsHueLightType from "../lights/philipsHueLight";
import philipsHueSceneType from "../scnene/philipsHueScene";
import PhilipsHueGroupsStateType from "./philipsHueGroupsState";

const PhilipsHueGroupsType = objectType({
    name: "PhilipsHueGroups",
    definition(t) {
        t.id("groupId");
        t.id("bridgeId");
        t.string("name");
        t.string("type");
        t.string("class", {nullable: true});
        t.boolean("recycle");
        t.list.field("lights",  {
            type: PhilipsHueLightType,
            async resolve(...params){
                return lightResolver(...params);
            }
        });
        t.list.field("scenes",  {
            type: philipsHueSceneType,
            async resolve(...params){
                return sceneResolver(...params);
            }
        });
        t.field("state",  {
            type: PhilipsHueGroupsStateType,
        });
        // t.string("sensors");
        // t.string("action");
    }
});

export default PhilipsHueGroupsType;

const lightResolver = async ({lights, bridgeId}) => {
    return await lightsLoader.load({lightIds: lights, bridgeId});
}

const sceneResolver = async ({groupId, bridgeId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    const scenesIds = Object.keys(bridge.scenes);

    let scenes = [];

    for (let sceneId of scenesIds) {
        const scene = bridge.scenes[sceneId];

        if (scene.group === groupId) {
            scenes.push({
                bridgeId,
                sceneId,
                ...scene,
            });
        }
    }

    return scenes;
}