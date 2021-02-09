import {displayBetween, displayVerticalCenter, mediaQuerySizeS} from "../../../../../core/style/constant";

const style = () => ({
    root: {
        maxWidth: mediaQuerySizeS,
        margin: "auto",
        padding: 40,
    },
    light: {
        ...displayBetween,
        padding: "20px",
        minHeight: 90,
        cursor: "pointer",
        flexDirection: "column",
    },
    lightHeader: {
        ...displayVerticalCenter,
        width: "100%",
    },
    lightIcon: {
        margin: 20,
    },
    lightTitle: {
        marginBottom: 2,
    },
    lightText: {
        marginBottom: 8,
    },
    lightEnd: {
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
    lightParam: {
        display: "flex",
        alignItems: "center",
        marginBottom: 5,
    },
    lightParamTitle: {
        width: 170,
        fontSize: "0.9rem",
        fontWeight: "300",
    },
    lightParamValue: {
        fontSize: "0.9rem",
        fontWeight: "400",
    },
    lightFromWrapper: {
        marginBottom: 30,
    },
    label: {
        marginBottom: 10,
    },
    lightFooter: {
        marginTop: 30,
    },
    lightParamWrapper: {
        margin: "auto",
        width: "fit-content",
    },
});

export default style;
