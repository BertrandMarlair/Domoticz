import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../../../core/style/constant";

const style = (theme) => ({
    root: {
        maxWidth: mediaQuerySizeS,
        margin: "auto",
        padding: 40,
    },
    bridge: {
        ...displayBetween,
        padding: "20px",
        minHeight: 90,
        cursor: "pointer",
        flexDirection: "column",
        "&:hover": {
            background: theme.palette.background.light,
        },
    },
    bridgeHeader: {
        ...displayVerticalCenter,
        width: "100%",
    },
    bridgeIcon: {
        margin: 20,
    },
    bridgeTitle: {
        marginBottom: 2,
    },
    bridgeText: {
        marginBottom: 8,
    },
    bridgeEnd: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
    },
    title: {
        margin: "30px 16px",
        fontSize: "1.4rem",
    },
});

export default style;
