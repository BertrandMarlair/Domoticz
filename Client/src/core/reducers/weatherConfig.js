export const initialState = {};

export const UPDATE_WEATHER_INFO = "UPDATE_WEATHER_INFO";

export default function DeviceReducer(state = initialState, {type, payload}) {
    switch (type) {
        case UPDATE_WEATHER_INFO:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
