/* eslint-disable no-case-declarations */
export const initialState = {
    philipsHue: null,
};

export const SYNC_DEVICE = "SYNC_DEVICE";
export const EDIT_LIGHT_STATE = "EDIT_LIGHT_STATE";
export const FAIL_TO_CONNECT_PHILIPS_HUE = "FAIL_TO_CONNECT_PHILIPS_HUE";

export default function DeviceReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SYNC_DEVICE:
            const lastUpdate = state?.philipsHue?.lastUpdate ?? new Date(0);

            if (payload?.force || lastUpdate.getTime() + 5000 < new Date().getTime()) {
                return {
                    ...state,
                    philipsHue: {
                        ...state.philipsHue,
                        ...payload,
                    },
                };
            }
            return state;
        case EDIT_LIGHT_STATE:
            let bridges = state.philipsHue.bridges;

            for (let param of payload) {
                const bridgeIndex = bridges.findIndex((b) => b._id === param.bridgeId);
                const bridge = bridges[bridgeIndex];
                const lightBridgeIndex = bridge.lights.findIndex((b) => b.lightId === param.lightId);

                let groups = [];

                for (let group of bridge.groups) {
                    let newGroup = group,
                        any_on = false;

                    const lightGroupIndex = group.lights.findIndex((b) => b.lightId === param.lightId);

                    if (lightGroupIndex >= 0) {
                        newGroup.lights = [
                            ...newGroup.lights.slice(0, lightGroupIndex),
                            {
                                ...newGroup.lights[lightGroupIndex],
                                state: {...newGroup.lights[lightGroupIndex].state, ...param.state},
                            },
                            ...newGroup.lights.slice(lightGroupIndex + 1),
                        ];
                    }

                    const allState = newGroup.lights.map((l) => l.state.on);

                    if (allState.includes(true)) {
                        any_on = true;
                    }

                    newGroup.state.any_on = any_on;

                    groups = [...groups, newGroup];
                }

                const newBridge = {
                    ...bridge,
                    lights: [
                        ...bridge.lights.slice(0, lightBridgeIndex),
                        {
                            ...bridge.lights[lightBridgeIndex],
                            state: {...bridge.lights[lightBridgeIndex].state, ...param.state},
                        },
                        ...bridge.lights.slice(lightBridgeIndex + 1),
                    ],
                    groups,
                };

                bridges = [...bridges.slice(0, bridgeIndex), newBridge, ...bridges.slice(bridgeIndex + 1)];
            }

            return {
                ...state,
                philipsHue: {
                    ...state.philipsHue,
                    bridges,
                    lastUpdate: new Date(),
                },
            };
        case FAIL_TO_CONNECT_PHILIPS_HUE:
            const bridgeIndex = state.philipsHue.bridges.findIndex((b) => b.ipAddress === payload.bridgeId);

            const newBridges = [
                ...state.philipsHue.bridges.slice(0, bridgeIndex),
                {
                    ...state.philipsHue.bridges[bridgeIndex],
                    connection: false,
                },
                ...state.philipsHue.bridges.slice(bridgeIndex + 1),
            ];

            return {
                ...state,
                philipsHue: {
                    ...state.philipsHue,
                    bridges: newBridges,
                    lastUpdate: new Date(),
                },
            };
        default:
            return state;
    }
}
