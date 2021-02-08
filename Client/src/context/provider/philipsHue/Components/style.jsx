import {displayBetween, displayCenter, displayFlex, displayVerticalCenter} from "../../../../core/style/constant";

const style = () => ({
    modalWrapper: {
        padding: 30,
    },
    modalButtonWrapper: {
        ...displayFlex,
    },
    iconWrapper: {
        ...displayCenter,
        marginTop: 50,
    },
    closeButtonWrapper: {
        marginTop: "50px !important",
    },
    stepContent: {
        margin: 20,
    },
    stepTitle: {
        marginBottom: 20,
    },
    stepDescription: {
        marginBottom: 10,
    },
    buttonWrapper: {
        display: "flex",
        alignItems: "center",
    },
    bridgeImage: {
        width: 200,
        display: "block",
        margin: "50px auto",
    },
    addBridgeicon: {
        display: "block",
        margin: "auto",
    },
    errorMessage: {
        textAlign: "center",
        fontSize: 16,
    },
    device: {
        ...displayBetween,
        padding: "0 20px",
        minHeight: 90,
        cursor: "pointer",
    },
    deviceHeader: {
        ...displayVerticalCenter,
        width: "100%",
    },
    deviceIcon: {
        margin: 20,
    },
    deviceTitle: {
        marginBottom: 2,
    },
    deviceText: {
        marginBottom: 8,
    },
    deviceEnd: {
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
