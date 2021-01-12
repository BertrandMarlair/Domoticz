import {displayVerticalCenter, widthSideBar, displayCenter} from "../../core/style/constant";

const style = (theme) => ({
    root: {
        left: 0,
        position: "fixed",
        boxShadow: theme.palette.boxShadow.main,
        height: "100%",
        background: theme.palette.background.paper,
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        zIndex: 1299,
    },
    logo: {
        ...displayCenter,
        marginTop: 20,
    },
    optionItem: {
        height: 42,
        cursor: "pointer",
        width: 42,
        ...displayVerticalCenter,
    },
    options: {
        ...displayVerticalCenter,
    },
    optionItemSmall: {
        marginBottom: 10,
        transition: "0.2s",
        cursor: "pointer",
        ...displayCenter,
        width: "100%",
    },
    menuSubItemId: {
        marginLeft: 15,
    },
    content: {
        marginTop: 40,
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    footer: {
        height: 60,
        ...displayVerticalCenter,
    },
    menuItem: {
        height: 52,
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
    },
    optionMenuItem: {
        ...displayVerticalCenter,
    },
    target: {
        width: 6,
        marginLeft: "-3px",
        height: "100%",
        borderRadius: "10px",
    },
    icon: {
        paddingRight: 18,
        paddingLeft: 15,
        height: "100%",
        ...displayVerticalCenter,
    },
    collapseIcon: {
        marginRight: 5,
        paddingLeft: 5,
        height: "100%",
        ...displayVerticalCenter,
    },
    menuItemText: {
        transition: "0.3s",
        marginLeft: 5,
        paddingRight: 5,
        minWidth: widthSideBar - 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerAvatar: {
        height: "80%",
        width: "80%",
        margin: 7,
        borderRadius: "100%",
        border: theme.palette.border.main,
        padding: 4,
    },
    zoomContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        margin: "0px 16px",
    },
    zoom: {
        width: 50,
    },
    size: {
        width: 35,
    },
    zoomContainerRight: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    zoomContainerLeft: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyDiv: {
        flex: 1,
    },
    iconRight: {
        marginRight: 10,
    },
    iconLeft: {
        marginLeft: 10,
    },
    iconCenter: {
        margin: 10,
    },
    menuItemSubOptions: {
        paddingLeft: 40,
    },
    menuItemSubOptionsTitle: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        ...displayVerticalCenter,
    },
});

export default style;
