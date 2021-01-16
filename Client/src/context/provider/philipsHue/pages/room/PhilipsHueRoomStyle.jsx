import {displayBetween, displayVerticalCenter} from "../../../../../core/style/constant";

const style = (theme) => ({
    room: {
        ...displayBetween,
        padding: "0 20px",
        minHeight: 90,
        cursor: "pointer",
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
