const style = (theme) => ({
    action: {
        width: 115,
        height: 115,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        justifyContent: "space-between",
        transition: "0.2s",
        margin: 10,
        padding: 12,
        "&:active": {
            transform: "scale(0.98)",
        },
    },
    actionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    actionFooter: {
        width: "100%",
        marginBottom: -5,
    },
    actionIcon: {
        margin: "0",
    },
    actionTitle: {
        fontWeight: 400,
        fontSize: "0.8rem",
        letterSpacing: 0,
        color: "inherit",
    },
    actionDescription: {
        fontWeight: 400,
        color: "inherit",
    },
    on: {
        color: theme.palette.text.dark,
    },
    off: {
        color: theme.palette.text.disabled,
    },
});

export default style;
