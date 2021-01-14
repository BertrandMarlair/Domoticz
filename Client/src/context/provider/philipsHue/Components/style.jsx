import {displayCenter, displayFlex} from "../../../../core/style/constant";

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
});

export default style;
