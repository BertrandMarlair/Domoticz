const style = (theme) => ({
    root: {
        background: theme.palette.background.light,
        margin: "12px",
        padding: 0,
        cursor: "pointer",
        backgroundSize: "100%",
        position: "relative",
        zIndex: 100,
        borderRadius: 11,
        "&:before": {
            content: "''",
            display: "block",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: "-100",
            transition: "opacity 0.7s",
            borderRadius: 11,
        },
    },
    wrapper: {
        position: "relative",
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 20px",
        transition: "0.2s",
    },
    texts: {
        flex: 1,
        marginLeft: 20,
        zIndex: 2,
    },
    icon: {
        zIndex: 2,
    },
    title: {
        fontSize: "0.9rem",
        fontWeight: 400,
    },
    description: {
        fontSize: "0.65rem",
        fontWeight: 300,
    },
    wrapperChanging: {
        top: 12,
    },
    wrapperText: {
        display: "flex",
        alignItems: "center",
    },
    switch: {
        width: 100,
        height: 60,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    switchSmall: {
        width: 100,
        height: 45,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});

export default style;
