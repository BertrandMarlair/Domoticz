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
    header: {
        ...displayVerticalCenter,
    },
    roomParam: {
        display: "flex",
        alignItems: "center",
        marginBottom: 5,
    },
    roomParamTitle: {
        width: 170,
        fontSize: "0.9rem",
        fontWeight: "300",
    },
    roomParamValue: {
        fontSize: "0.9rem",
        fontWeight: "400",
    },
    roomFromWrapper: {
        marginBottom: 30,
    },
    label: {
        marginBottom: 10,
    },
    input: {
        marginBottom: 20,
    },
    form: {
        margin: 20,
    },
    roomFooter: {
        marginTop: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    roomParamWrapper: {},
    light: {
        display: "flex",
        alignItems: "center",
        marginBottom: 5,
        width: "100%",
        "&:nth-child(2n)": {
            background: theme.palette.background.paper,
        },
    },
    lightIcon: {
        marginLeft: 10,
        marginRight: 20,
    },
    lightText: {
        flex: 1,
    },
});

export default style;
