import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../../../core/style/constant";

const style = (theme) => ({
    root: {
        maxWidth: mediaQuerySizeS,
        margin: "auto",
        padding: 40,
    },
    light: {
        ...displayBetween,
        padding: "20px",
        minHeight: 90,
        cursor: "pointer",
        flexDirection: "column",
        "&:hover": {
            background: theme.palette.background.light,
        },
    },
    lightHeader: {
        ...displayVerticalCenter,
        width: "100%",
    },
    lightIcon: {
        margin: 20,
    },
    lightTitle: {
        marginBottom: 2,
    },
    lightText: {
        marginBottom: 8,
    },
    lightEnd: {
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
