import {createStore, combineReducers} from "redux";
import connected from "../reducers/connectConfig";
import darkMode from "../reducers/darkModeConfig";
import theme from "../reducers/themeConfig";
import loading from "../reducers/loadingConfig";
import devices from "../reducers/devicesConfig";

const rootReducer = combineReducers({
    connected,
    darkMode,
    theme,
    loading,
    devices,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const configureStore = () => store;

export default configureStore;
