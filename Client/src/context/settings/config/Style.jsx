import {borderLight, mediaQuerySizeXxs} from "../../../core/style/constant";

const style = (theme) => {
    return {
        drawer: {
            transition: "0.2s",
            width: "100%",
            height: "100%",
            background: theme.palette.background.default,
        },
        drawerSmall: {
            minHeight: "100%",
        },
        drawerWrapper: {
            display: "flex",
            flexDirection: "column",
            height: "95%",
        },
        wrapper: {
            display: "flex",
            padding: 15,
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                flexDirection: "column",
            },
        },
        header: {
            margin: 20,
            padding: 30,
        },
        logo: {
            height: "100%",
        },
        navBar: {
            width: 400,
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
            borderBottom: borderLight,
            width: "-webkit-fill-available",
            height: "100px",
        },
        icon: {
            marginRight: 20,
        },
        main: {
            width: "100%",
            height: "100%",
            [`@media (max-width: ${mediaQuerySizeXxs}px)`]: {
                width: "unset",
            },
        },
    };
};

export default style;
