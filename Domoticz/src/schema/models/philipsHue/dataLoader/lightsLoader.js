import DataLoader from "dataloader";
import { query } from "../../../../core/mongo";
import { ObjectId } from "mongodb";
import { DBBridges } from "..";

const filterLights = (key, bridgeId, bridges) => {
    const light = [];
    for (const bridge of bridges) {
        if (bridge._id.toString() === bridgeId.toString()) {
            for (let lightId of key) {
                light.push({...bridge?.lights?.[lightId], bridgeId, lightId} ?? {});
            }
        }
    }

    return light;
};

const getBatchAssignee = async (keys, bridgeIds, bridgeMapIds) => {
    const bridges = await query(DBBridges, {_id: {$in: bridgeMapIds.map((id) => new ObjectId(id))}});

    const result = [];

    for (const index in keys) {
        let lights = filterLights(keys[index], bridgeIds[index], bridges);

        result.push(lights || []);
    }

    return result;
};

const dispatchData = keys => {
    const ids = [...new Set(keys.map(key => key.lightIds))];
    const bridgeIds = keys.map(key => key.bridgeId);
    const bridgeMapIds = [...new Set(bridgeIds)];
    return getBatchAssignee(ids, bridgeIds, bridgeMapIds);
}

const lightsLoader = new DataLoader(
    keys => dispatchData(keys),
    {cache: false},
);

export default lightsLoader;
