const style = () => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        overflowY: "scroll",
    },
    action: {
        minWidth: 155,
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        transition: "0.5s",
    },
    actionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    actionIcon: {
        margin: "20px 0",
    },
    actionTitle: {
        fontWeight: 500,
        marginBottom: 5,
        fontSize: "0.9rem",
    },
});

export default style;
