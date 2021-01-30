import {displayVerticalCenter, borderLight} from "../../../core/style/constant";

const style = () => ({
    root: {
        margin: "auto",
        minHeight: "90vh",
        padding: 10,
    },
    header: {
        ...displayVerticalCenter,
    },
    manageUserIcon: {
        marginLeft: 16,
        marginRight: 20,
    },
    userContent: {
        marginLeft: 16,
        marginRight: 16,
    },
    wrapper: {
        display: "flex",
        padding: 15,
    },
    navBar: {
        width: 400,
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
    },
    navItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        padding: 20,
        borderBottom: borderLight,
        width: "-webkit-fill-available",
        height: "100px",
    },
    icon: {
        marginRight: 20,
    },
});

export default style;
