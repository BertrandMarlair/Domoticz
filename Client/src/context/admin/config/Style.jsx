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
