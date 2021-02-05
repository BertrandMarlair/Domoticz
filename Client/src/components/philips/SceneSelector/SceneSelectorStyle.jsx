const style = (theme) => ({
    root: {
        position: "relative",
    },
    wrapper: {
        padding: 20,
        minHeight: 200,
    },
    scene: {
        height: 50,
        background: theme.palette.background.light,
        padding: 10,
        margin: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        boxShadow: "0px 0px 8px #00000052",
        cursor: "pointer",
        backgroundSize: "100%",
        position: "relative",
        "&:before": {
            content: "''",
            display: "block",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transition: "opacity 0.7s",
            borderRadius: 11,
        },
    },
});

export default style;
