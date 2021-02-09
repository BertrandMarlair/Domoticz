import {mediaQuerySizeXxs, mediaQuerySizeSm, displayBetween, displayVerticalCenter} from "../../../core/style/constant";

const style = (theme) => {
    return {
        drawer: {
            maxWidth: mediaQuerySizeSm,
            margin: "auto",
            minHeight: "96vh",
            height: "96%",
            padding: 10,
            width: "100%",
        },
        drawerSmall: {
            minHeight: "100%",
        },
        drawerWrapper: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: 20,
        },
        wrapper: {
            display: "flex",
            marginTop: 25,
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                flexDirection: "column",
            },
        },
        header: {
            ...displayBetween,
            margin: 0,
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                flexDirection: "column",
            },
        },
        headerWrapper: {
            ...displayVerticalCenter,
        },
        headerIcon: {
            margin: 20,
        },
        logo: {
            height: "100%",
        },
        navBar: {
            width: 400,
            marginLeft: 0,
            height: "100%",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                width: "100%",
            },
        },
        navItem: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: 5,
            padding: 20,
            borderBottom: theme.palette.border.main,
            width: "-webkit-fill-available",
            height: "100px",
        },
        icon: {
            marginRight: 20,
        },
        main: {
            width: "100%",
            height: "100%",
            marginRight: 0,
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                width: "unset",
            },
        },
    };
};

export default style;
