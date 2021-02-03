import {displayBetween, displayVerticalCenter, mediaQuerySizeSm, mediaQuerySizeXxs} from "../../../core/style/constant";

const style = () => ({
    root: {
        maxWidth: mediaQuerySizeSm,
        margin: "auto",
        minHeight: "90vh",
        padding: 10,
    },
    [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
        container: {
            width: "100%",
            margin: "auto",
        },
    },
    gridItem: {
        padding: 20,
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
        margin: 20,
        [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
            flexDirection: "column",
        },
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
    option: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    installNewProviderText: {
        margin: "10px 25px",
    },
});

export default style;
