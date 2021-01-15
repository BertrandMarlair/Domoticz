import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../core/style/constant";

const style = () => ({
    root: {
        maxWidth: mediaQuerySizeS,
        margin: "auto",
        padding: 40,
    },
    card: {
        maxWidth: 400,
        minWidth: 245,
        padding: 30,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        margin: "10px auto",
        height: "100%",
    },
    description: {
        marginTop: 20,
        marginBottom: 50,
        flexGrow: 1,
    },
    addProvider: {
        ...displayBetween,
    },
    addProviderHeader: {
        ...displayVerticalCenter,
    },
    addProviderIcon: {
        margin: 20,
    },
    addProviderTitle: {
        marginBottom: 2,
    },
    addProviderText: {
        marginBottom: 8,
    },
    addBridge: {
        width: "fit-content",
        margin: "auto",
    },
    addBridgeDescription: {
        marginTop: 30,
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
});

export default style;
