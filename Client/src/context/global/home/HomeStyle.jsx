import {boxShadowLight} from "../../../core/style/constant";

const style = (theme) => ({
    root: {
        height: "100%",
        display: "flex",
    },
    leftSidenav: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    rightSidenav: {
        width: 800,
        height: "100%",
        backgroundColor: theme.palette.background.light,
        boxShadow: boxShadowLight,
    },
    wrapperMain: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    wrapperAction: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
    },
});

export default style;
