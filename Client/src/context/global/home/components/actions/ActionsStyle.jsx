const style = () => ({
    root: {
        overflowY: "scroll",
        width: "100%",
        padding: 25,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    categoryTitle: {
        marginTop: 12,
        marginLeft: 12,
        userSelect: "none",
    },
    action: {
        minWidth: 155,
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
        transition: "0.5s",
        maxWidth: 200,
        margin: "20px auto",
    },
    categoryWrapper: {
        display: "flex",
        flexWrap: "wrap",
    },
    category: {
        width: 270,
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
    modalContent: {
        padding: 20,
    },
});

export default style;
