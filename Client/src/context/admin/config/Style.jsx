import {displayVerticalCenter} from "../../../core/style/constant";

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
        logo: {
            height: "100%",
        },
        wrapper: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
        },
        item: {
            flexGrow: 1,
        },
        icon: {
            marginRight: 20,
        },
        header: {
            margin: 10,
            padding: 10,
            ...displayVerticalCenter,
        },
        profile: {
            margin: 0,
        },
    };
};

export default style;

export const modalStyles = {
    wrapperModal: {
        padding: 40,
        minWidth: 500,
    },
    title: {
        marginBottom: 20,
    },
    description: {
        marginBottom: 30,
    },
    form: {
        width: "100%",
        paddingTop: 0,
    },
    label: {
        margin: "5px 0",
    },
    input: {
        marginTop: 20,
        marginBottom: 10,
        width: "100%",
    },
    formFooter: {
        marginTop: 30,
    },
};

export const managePageStyles = {
    root: {
        margin: "auto",
        minHeight: "90vh",
        padding: 10,
    },
    wrapper: {
        display: "flex",
    },
    icon: {
        marginRight: 20,
    },
    main: {
        width: "100%",
        height: "100%",
        margin: 10,
    },
    navBar: {
        width: 400,
        height: "100%",
        margin: 10,
        paddingRight: 20,
    },
    navItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 60,
    },
    [`@media (max-width: 1023px)`]: {
        navBar: {
            width: 300,
            margin: 5,
            paddingRight: 0,
        },
        icon: {
            marginRight: 10,
        },
        navItem: {
            paddingRight: 0,
            paddingTop: 5,
            paddingBottom: 5,
            height: 60,
        },
    },
};

export const mainContentStyles = {
    header: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 5,
        paddingBottom: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    date: {
        paddingLeft: 5,
    },
    wrapper: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
    },
    item: {
        flexGrow: 1,
    },
};

export const mainBtnStyles = {
    wrapperBtn: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        margin: 14,
        "& div": {
            flexGrow: 1,
            padding: 2,
            "& button": {
                margin: "0 !important",
                width: "100%",
            },
        },
    },
};
