import {displayVerticalCenter} from "../../../core/style/constant";

const style = () => {
    return {
        drawer: {
            transition: "0.2s",
            width: "100%",
            height: "100%",
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
    },
    form: {
        width: "100%",
        paddingTop: 0,
    },
    title: {
        marginBottom: 20,
    },
    description: {
        marginBottom: 30,
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
    },
    itemBtn: {
        flexGrow: 1,
    },
};
