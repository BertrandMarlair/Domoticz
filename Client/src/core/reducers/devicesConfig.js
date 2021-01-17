export const initialState = {
    philipsHue: null,
};

export const SYNC_DEVICE = "SYNC_DEVICE";

export default function DeviceReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SYNC_DEVICE:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
