const style = (theme) => ({
    root: {
        display: "flex",
        marginLeft: 15,
    },
    bar: {
        background: theme.palette.primary.main,
        boxShadow: `1px 0px 11px ${theme.palette.primary.light}90`,
        width: 4,
        borderRadius: 10,
        marginRight: 20,
    },
    times: {
        display: "flex",
    },
    date: {
        fontWeight: 300,
    },
    hours: {
        fontSize: "5.5rem",
        fontWeight: 400,
        lineHeight: "5.5rem",
        letterSpacing: "-4px",
    },
    minutes: {
        fontSize: "5.5rem",
        fontWeight: 200,
        lineHeight: "5.5rem",
        letterSpacing: "-4px",
    },
});

export default style;
