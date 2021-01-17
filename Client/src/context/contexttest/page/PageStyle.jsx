import {mediaQuerySizeSm} from "../../../core/style/constant";

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
    wrapper: {
        padding: 20,
    },
    title: {
        marginBottom: 20,
    },
    label: {
        margin: "5px 0",
    },
    input: {
        marginTop: 20,
        marginBottom: 10,
        width: "100%",
    },
    form: {
        width: "100%",
        padding: 30,
        paddingTop: 0,
    },
    formFooter: {
        marginTop: 30,
    },
});

export default style;
