import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../../../core/style/constant";

const style = (theme) => ({
    root: {
        maxWidth: mediaQuerySizeS,
        margin: "auto",
        padding: 40,
    },
    room: {
        ...displayBetween,
        padding: "20px",
        minHeight: 90,
        cursor: "pointer",
        flexDirection: "column",
        "&:hover": {
            background: theme.palette.background.light,
        },
    },
    roomHeader: {
        ...displayVerticalCenter,
        width: "100%",
    },
    roomIcon: {
        margin: 20,
    },
    roomTitle: {
        marginBottom: 2,
    },
    roomText: {
        marginBottom: 8,
    },
    roomEnd: {
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
