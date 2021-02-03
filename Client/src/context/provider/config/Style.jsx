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
    };
};

export default style;
