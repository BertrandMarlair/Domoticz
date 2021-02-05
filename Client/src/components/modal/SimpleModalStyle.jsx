const style = (theme) => ({
    root: {
        boxShadow: theme.palette.boxShadow.main,
        background: theme.palette.background.default,
        padding: 0,
        outline: "none",
        borderRadius: 10,
        display: "flex",
    },
    header: {
        padding: 15,
        display: "flex",
        alignItems: "center",
        background: theme.palette.background.paper,
    },
    body: {
        padding: 15,
    },
    iconButton: {
        marginLeft: 10,
    },
    headerTitle: {
        marginLeft: 30,
    },
    maxWidth: {
        maxWidth: 0,
    },
    noScroll: {
        overflow: "initial !important",
    },
    backDrop: {
        backdropFilter: "blur(8px)",
    },
});

export default style;
