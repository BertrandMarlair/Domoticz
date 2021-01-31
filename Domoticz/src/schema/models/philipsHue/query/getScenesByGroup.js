
import { idArg } from "nexus";
import philipsHueSceneType from "../type/scnene/philipsHueScene";
import { queryOneById } from "../../../../core/mongo";
import { DBBridges } from "..";

export default (t) => 
    t.list.field("getScenesByGroup", {
        type: philipsHueSceneType,
        nullable: true,
        args: {
            groupId: idArg({required: true}),
            bridgeId: idArg({required: true}),
        },
        async resolve(...params) {
            return await getScenesByGroup(...params)
        },
    });


const getScenesByGroup = async (_, {bridgeId, groupId}) => {
    const bridge = await queryOneById(DBBridges, bridgeId);

    if (!bridge) {
        throw new Error("Bridge not found");
    }

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

    return scenes.filter((scene) => scene.name !== "HueEssentialsEffect");
}