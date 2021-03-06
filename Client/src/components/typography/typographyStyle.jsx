// ##############################
// // // Typography styles
// #############################

import {remXXS, remS, remL, remMl, sizeS, remXs, fontFamily, remXXl} from "../../core/style/constant";

const typographyStyle = (theme) => ({
    defaultFontStyle: {
        fontFamily,
        letterSpacing: "0.3px",
        fontSize: "0.9rem",
        lineHeight: 1.5,
        color: theme.palette.text.primary,
    },
    defaultHeaderMargins: {
        marginTop: "20px",
        marginBottom: "10px",
    },
    title: {
        fontSize: remXXl,
        color: theme.palette.text.primary,
        fontWeight: 200,
    },
    smaller: {
        fontSize: remL,
    },
    quote: {
        padding: "10px 20px",
        margin: "0 0 20px",
        fontSize: remXXS,
        borderLeft: theme.palette.border.main,
    },
    quoteText: {
        margin: "0 0 10px",
        fontStyle: "italic",
    },
    quoteAuthor: {
        display: "block",
        fontSize: "80%",
        lineHeight: "1.42857143",
        color: theme.palette.text.secondary,
    },
    mutedText: {
        color: theme.palette.text.secondary,
    },
    primaryText: {
        color: theme.palette.primary.main,
    },
    normalText: {
        fontSize: remS,
        color: theme.palette.text.primary,
        lineHeight: "normal",
        fontWeight: 300,
    },
    smallTitleText: {
        color: theme.palette.text.primary,
        fontSize: remMl,
        fontWeight: 400,
    },
    success: {
        color: theme.palette.success.main,
    },
    label: {
        color: theme.palette.text.light,
    },
    warning: {
        color: theme.palette.warning.main,
    },
    error: {
        color: theme.palette.error.main,
    },
    white: {
        color: theme.palette.white.main,
    },
    inherit: {
        color: "inherit",
    },
    link: {
        color: theme.palette.link.main,
    },
    lightGrey: {
        color: theme.palette.text.light,
    },
    contrasted: {
        color: theme.palette.text.fixed,
    },
    small: {
        fontSize: remXs,
    },
    big: {
        fontSize: remL,
    },
    primary: {
        color: theme.palette.primary.main,
    },
    default: {
        color: theme.palette.text.primary,
    },
    center: {
        textAlign: "center",
    },
    bold: {
        fontWeight: 500,
    },
    normal: {
        fontWeight: 300,
    },
    light: {
        fontWeight: 200,
    },
    italic: {
        fontStyle: "italic",
    },
    caption: {
        color: theme.palette.text.secondary,
        fontSize: remXs,
        fontWeight: sizeS,
    },
    underline: {
        textDecoration: "underline",
    },
    ellipsis: {
        whiteSpace: "nowrap !important",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    hoverable: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    margin: {
        marginLeft: 5,
    },
    minWidth: {
        minWidth: 180,
    },
    preWrap: {
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
    },
    noWrap: {
        wordBreak: "inherit",
    },
    centered: {
        textAlign: "center",
    },
});

export default typographyStyle;
