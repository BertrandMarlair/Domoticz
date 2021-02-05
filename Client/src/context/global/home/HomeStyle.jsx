import {mediaQuerySizeXs, mediaQuerySizeXxs} from "../../../core/style/constant";

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
        backgroundColor: `${theme.palette.background.default}33`,
        boxShadow: theme.palette.boxShadow.main,
        borderLeft: theme.palette.border.dark,
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
        // justifyContent: "space-around",
        marginTop: 100,
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
    },
    headerTabs: {
        marginTop: 10,
        padding: "0 18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "300",
    },
});

export default style;
