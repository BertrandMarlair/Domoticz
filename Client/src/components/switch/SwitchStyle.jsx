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
                border: "none",
                height: 22,
                marginTop: 2,
                width: "90%",
            },
        },
        "&$focusVisible $thumb": {
            color: theme.palette.background.dark,
            border: "6px solid #fff",
        },
    },
    thumb: {
        width: 24,
        height: 24,
        boxShadow: "0px 0px 3px rgb(0 0 0 / 53%)",
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
});

export default style;
