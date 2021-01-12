/* eslint-disable no-case-declarations */
import {getLocalstorage, setLocalstorage} from "../localstorage/localStorage";
import {primary, primaryDark, primaryLight} from "../style/constant";

const localColor = getLocalstorage("color");
const localZoom = getLocalstorage("zoom");

export const initialState = {
    primaryColor: localColor ? localColor.primaryColor : primary,
    primaryLightColor: localColor ? localColor.primaryLightColor : primaryLight,
    primaryDarkColor: localColor ? localColor.primaryDarkColor : primaryDark,
    zoom: localZoom ? parseFloat(localZoom) : 1,
};

const EDIT_THEME_COLOR = "EDIT_THEME_COLOR";
const TOGGLE_ZOOM = "TOGGLE_ZOOM";
const TOGGLE_UN_ZOOM = "TOGGLE_UN_ZOOM";
const DEFAULT_ZOOM = "DEFAULT_ZOOM";

export default function ThemeReducer(state = initialState, {type, payload}) {
    switch (type) {
        case EDIT_THEME_COLOR:
            setLocalstorage("color", payload);
            return {
                ...state,
                primaryColor: payload.primaryColor,
                primaryLightColor: payload.primaryLightColor,
                primaryDarkColor: payload.primaryDarkColor,
            };
        case TOGGLE_ZOOM:
            const zoom = (parseFloat(state.zoom) + 0.1).toFixed(2);

            setLocalstorage("zoom", zoom);
            return {
                ...state,
                zoom,
            };
        case TOGGLE_UN_ZOOM:
            const unZoom = (parseFloat(state.zoom) - 0.1).toFixed(2);

            setLocalstorage("zoom", unZoom);
            return {
                ...state,
                zoom: unZoom,
            };
        case DEFAULT_ZOOM:
            setLocalstorage("zoom", 1);
            return {
                ...state,
                zoom: 1,
            };
        default:
            return state;
    }
}
