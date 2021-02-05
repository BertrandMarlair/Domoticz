import {
    boxShadow,
    borderLight,
    borderDark,
    borderInput,
    borderMedium,
    background,
    backgroundLight,
    backgroundCard,
    backgroundCardOff,
    backgroundCardOn,
    backgroundPaper,
    textColorLight,
    textColorDark,
    textColorDisabled,
    textColorWhite,
} from "../style/constant";
import {globalPalette} from "./globalPalette";
import {globalMui} from "./globalMui";
import {useSelector} from "react-redux";

const useCustomTheme = () => {
    const theme = useSelector((state) => state.theme);

    console.log(theme);

    const themeSettingsLight = {
        palette: {
            type: "light",
            common: {
                black: "rgba(0, 0, 0, 1)",
                white: "#ffffff",
                light: "rgb(24, 31, 43)",
            },
            primary: {
                light: theme.primaryLightColor,
                main: theme.primaryColor,
                dark: theme.primaryDarkColor,
                mainContrast: theme.primaryLightColor,
                contrastText: "#ffffff",
                loaderColor: "#ffffff",
            },
            secondary: {
                light: "rgba(111, 235, 179, 1)",
                main: "rgba(57, 190, 131, 1)",
                dark: "rgba(24, 155, 97, 1)",
                contrastText: "#ffffff",
            },
            text: {
                primary: textColorLight,
                secondary: textColorDark,
                white: textColorWhite,
                dark: textColorDark,
                disabled: textColorDisabled,
            },
            background: {
                default: background,
                paper: backgroundPaper,
                light: backgroundLight,
                card: backgroundCard,
                cardOn: backgroundCardOff,
                cardOff: backgroundCardOn,
            },
            boxShadow: {
                main: boxShadow,
            },
            border: {
                main: borderLight,
                input: borderInput,
                medium: borderMedium,
                dark: borderDark,
            },
            input: {
                placeholder: "#c8cbca",
            },
            hover: {
                select: "rgba(0, 0, 0, 0.38)",
            },
            ...globalPalette,
        },
        ...globalMui,
    };

    const themeSettingsDark = {
        palette: {
            type: "dark",
            common: {
                black: "rgba(0, 0, 0, 1)",
                white: "#ffffff",
                light: "rgb(24, 31, 43)",
            },
            primary: {
                light: theme.primaryLightColor,
                main: theme.primaryColor,
                dark: theme.primaryDarkColor,
                mainContrast: theme.primaryLightColor,
                contrastText: "#ffffff",
                loaderColor: "#ffffff",
            },
            secondary: {
                light: "rgba(111, 235, 179, 1)",
                main: "rgba(57, 190, 131, 1)",
                dark: "rgba(24, 155, 97, 1)",
                contrastText: "#ffffff",
            },
            text: {
                primary: textColorLight,
                secondary: textColorDark,
                dark: textColorDark,
                disabled: textColorDisabled,
                white: textColorWhite,
            },
            background: {
                default: background,
                paper: backgroundPaper,
                light: backgroundLight,
                card: backgroundCard,
                cardOn: backgroundCardOn,
                cardOff: backgroundCardOff,
            },
            boxShadow: {
                main: boxShadow,
            },
            border: {
                main: borderLight,
                input: borderInput,
                medium: borderMedium,
                dark: borderDark,
            },
            input: {
                placeholder: "#c8cbca",
            },
            hover: {
                select: "rgba(0, 0, 0, 0.38)",
            },
            ...globalPalette,
        },
        ...globalMui,
    };

    return {themeSettingsLight, themeSettingsDark};
};

export default useCustomTheme;
