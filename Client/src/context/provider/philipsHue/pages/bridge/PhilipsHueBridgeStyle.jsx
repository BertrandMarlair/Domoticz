import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../../../core/style/constant";

const style = () => ({
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
    header: {
        ...displayVerticalCenter,
    },
    bridgeParam: {
        display: "flex",
        alignItems: "center",
        marginBottom: 5,
    },
    bridgeParamTitle: {
        width: 170,
        fontSize: "0.9rem",
        fontWeight: "300",
    },
    bridgeParamValue: {
        fontSize: "0.9rem",
        fontWeight: "400",
    },
    bridgeFromWrapper: {
        marginBottom: 30,
    },
    label: {
        marginBottom: 10,
    },
    bridgeFooter: {
        marginTop: 30,
    },
    bridgeParamWrapper: {
        margin: "auto",
        width: "fit-content",
    },
});

export default style;
