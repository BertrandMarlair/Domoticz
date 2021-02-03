import {boxShadowLight, mediaQuerySizeXs, mediaQuerySizeXxs} from "../../../core/style/constant";

const style = (theme) => ({
    root: {
        height: "100%",
        display: "flex",
        width: "100%",
    },
    leftSidenav: {
        width: "65%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "50%",
        },
    },
    rightSidenav: {
        width: "35%",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: boxShadowLight,
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
            width: "50%",
        },
        [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
            width: "100%",
            boxShadow: "none",
            borderRadius: "30px",
        },
    },
    wrapperMain: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
    },
    headerTabs: {
        marginTop: 10,
        padding: "0 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "300",
    },
});

export default style;
