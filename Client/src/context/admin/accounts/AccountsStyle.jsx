import {displayBetween, displayVerticalCenter, mediaQuerySizeSm} from "../../../core/style/constant";

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
    [`@media (max-width: 1023px)`]: {
        optionalDisplay: {
            display: "none",
        },
    },
    table: {
        textTransform: "capitalize",
    },
    tableContainer: {
        padding: 10,
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
    addCard: {
        ...displayBetween,
        margin: 10,
    },
    addCardHeader: {
        ...displayVerticalCenter,
    },
    addCardIcon: {
        marginLeft: 20,
        marginRight: 20,
    },
    addCardTitle: {
        marginBottom: 2,
    },
    addCardText: {
        marginBottom: 8,
    },
    editAccountButton: {
        width: "10%",
    },
    option: {
        display: "flex",
        flexDirection: "row-reverse",
    },
});

export default style;
