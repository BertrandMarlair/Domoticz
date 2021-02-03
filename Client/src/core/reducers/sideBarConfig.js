import {getLocalstorage} from "../localstorage/localStorage";
import {mediaQuerySizeXs} from "../style/constant";

const localSideBar = getLocalstorage("sideBarOpen");

const mobile = window.document.body.offsetWidth < mediaQuerySizeXs;

export const initialState = {
    isSidebarOpened: mobile ? false : localSideBar,
};

export const TOGGLE_SIDEBAR = "Layout/TOGGLE_SIDEBAR";
export const CLOSE_SIDEBAR = "Layout/CLOSE_SIDEBAR";

export default function SidebBarReducer(state = initialState, {type}) {
    switch (type) {
        case TOGGLE_SIDEBAR:
            localStorage.setItem("sideBarOpen", !state.isSidebarOpened);
            return {
                ...state,
                isSidebarOpened: !state.isSidebarOpened,
            };
        case CLOSE_SIDEBAR:
            localStorage.setItem("sideBarOpen", false);
            return {
                ...state,
                isSidebarOpened: false,
            };
        default:
            return state;
    }
}
