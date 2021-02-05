const style = (theme) => ({
    root: {
        background: theme.palette.background.card,
        margin: 16,
        padding: 16,
        borderRadius: 10,
    },
    noPadding: {
        padding: 0,
    },
    noMargin: {
        margin: 0,
        marginTop: 10,
    },
    on: {
        background: theme.palette.background.cardOn,
    },
    off: {
        background: theme.palette.background.cardOff,
    },
});

export default style;
