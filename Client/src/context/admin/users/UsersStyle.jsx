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
    tableContainer: {
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
    addUser: {
        ...displayBetween,
        margin: 20,
    },
    addUserHeader: {
        ...displayVerticalCenter,
    },
    addUserIcon: {
        margin: 20,
    },
    addUserTitle: {
        marginBottom: 2,
    },
    addUserText: {
        marginBottom: 8,
    },
    option: {
        display: "flex",
        flexDirection: "row-reverse",
    },
});

export default style;