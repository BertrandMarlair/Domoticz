const style = (theme) => ({
    root: {
        margin: "auto",
        minHeight: "90vh",
        padding: 10,
    },
    wrapper: {
        display: "flex",
    },
    navBar: {
        width: 400,
        height: "100%",
        margin: 10,
        paddingRight: 20,
    },
    navItem: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        // borderBottom: borderLight,
        height: 60,
    },
    icon: {
        marginRight: 20,
    },
    main: {
        width: "100%",
        height: "100%",
        margin: 10,
    },
    navItemActive: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow.main,
        borderBottom: "1px solid transparent",
        borderRadius: 10,
    },
});

export default style;
