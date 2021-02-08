const style = (theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        minWidth: 110,
        borderRadius: 6,
        position: "relative",
        padding: "7px 25px",
        margin: "8px 10px !important",
        fontSize: "16px",
        fontWeight: "400",
        textAlign: "center",
        whiteSpace: "nowrap",
        border: theme.palette.border.main,
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
    primary: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
    primaryDark: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    lightPrimary: {
        border: `1px solid ${theme.palette.text.colored}`,
        background: theme.palette.background.default,
        color: theme.palette.text.colored,
        "&:hover": {
            border: `1px solid ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
        },
    },
    secondary: {
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    error: {
        background: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.error.light,
        },
    },
    errorInverted: {
        background: theme.palette.background.default,
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
        },
    },
    success: {
        background: theme.palette.success.main,
        color: theme.palette.success.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.success.dark,
        },
    },
    warning: {
        background: "transparent",
        color: theme.palette.warning.light,
        border: `1px solid ${theme.palette.warning.main}`,
        "&:hover": {
            backgroundColor: `${theme.palette.warning.main}1a`,
        },
    },
    successLight: {
        background: "transparent",
        color: theme.palette.success.main,
        border: `1px solid ${theme.palette.success.main}`,
        "&:hover": {
            backgroundColor: `${theme.palette.success.main}1a`,
        },
    },
    link: {
        background: theme.palette.link.main,
        color: theme.palette.link.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.link.dark,
        },
    },
    disabled: {
        background: theme.palette.grey[300],
        color: `${theme.palette.grey[500]} !important`,
        "&:hover": {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    white: {
        background: theme.palette.white.main,
        color: `${theme.palette.text.dark} !important`,
        "&:hover": {
            backgroundColor: theme.palette.white.light,
            color: theme.palette.text.dark,
        },
    },
    transparent: {
        background: "none",
        border: `1.2px solid ${theme.palette.white.main}`,
        color: `${theme.palette.white.main} !important`,
        "&:hover": {
            backgroundColor: `${theme.palette.white.main}20`,
            color: theme.palette.white.main,
        },
    },
    fullWidth: {
        width: "100%",
    },
    round: {
        borderRadius: 30,
    },
    radius: {
        borderRadius: 4,
    },
    noMargin: {
        margin: "0 !important",
    },
    lg: {
        padding: "0.725rem 2.15rem",
        fontSize: "1rem",
        lineHeight: "1.333333",
    },
    sm: {
        fontSize: "0.8rem",
        padding: "5px 15px",
        minWidth: 70,
        height: 38,
    },
    big: {
        padding: "18px 40px",
    },
    whiteText: {
        color: "white",
    },
    blank: {
        background: "none",
        color: theme.palette.text.colored,
        fontWeight: 400,
        "&:hover": {
            color: theme.palette.text.coloredLight,
            background: "none",
        },
    },
    noBorder: {
        border: "none",
    },
    noMinWidth: {
        minWidth: 0,
    },
    icon: {
        width: 50,
        height: 50,
        maxWidth: 50,
        minWidth: "unset",
        borderRadius: "100%",
    },
    iconSmall: {
        padding: 0,
        width: 20,
        height: 20,
        maxWidth: 20,
        minWidth: "unset",
        borderRadius: "100%",
    },
});

export default style;
