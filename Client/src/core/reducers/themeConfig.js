/* eslint-disable no-case-declarations */
import {getLocalstorage, setLocalstorage} from "../localstorage/localStorage";
import {primary, primaryDark, primaryLight} from "../style/constant";

const localColor = getLocalstorage("color");

export const initialState = {
    primaryColor: localColor ? localColor.primaryColor : primary,
    primaryLightColor: localColor ? localColor.primaryLightColor : primaryLight,
    primaryDarkColor: localColor ? localColor.primaryDarkColor : primaryDark,
};

const EDIT_THEME_COLOR = "EDIT_THEME_COLOR";

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
        default:
            return state;
    }
}
