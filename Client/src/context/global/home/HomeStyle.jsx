import {boxShadowLight} from "../../../core/style/constant";

const style = (theme) => ({
    root: {
        height: "100%",
        display: "flex",
    },
    leftSidenav: {
        width: "65%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
    },
    rightSidenav: {
        width: "35%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: boxShadowLight,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
    },
    wrapperMain: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
    },
    headerTabs: {
        margin: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "300",
    },
});

export default style;
