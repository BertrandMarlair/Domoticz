const style = (theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
    },
    switchBase: {
        padding: 1,
        "&$checked": {
            transform: "translateX(16px)",
            color: theme.palette.common.white,
            "& + $track": {
                backgroundColor: theme.palette.background.dark,
                opacity: 1,
            },
        },
    },
    thumb: {
        width: 24,
        height: 24,
        boxShadow: "0px 0px 3px rgb(0 0 0 / 53%)",
        backgroundColor: theme.palette.common.white,
    },
    track: {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.background.dark,
        opacity: 1,
        height: 22,
        width: "90%",
        marginTop: 2,
        marginLeft: 2,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
});

export default style;
