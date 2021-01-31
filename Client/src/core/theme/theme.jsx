import {
    boxShadowLight,
    boxShadowDark,
    boxShadowLightWhite,
    boxShadowDarkWhite,
    borderLight,
    borderDark,
    borderInput,
    borderWhite,
    borderReactionLight,
    borderReactionDark,
    borderMedium,
    textColorLight,
    background,
    backgroundDark,
    backgroundMedium,
} from "../style/constant";
import {globalPalette} from "./globalPalette";
import {globalMui} from "./globalMui";
import {useSelector} from "react-redux";
import {lightenColor} from "../utils/misc";

const useCustomTheme = () => {
    const theme = useSelector((state) => state.theme);

    console.log(theme);

    const themeSettingsLight = {
        palette: {
            type: "light",
            common: {
                black: "rgba(0, 0, 0, 1)",
                white: "#ffffff",
                light: "#F5F7FB",
            },
            primary: {
                light: theme.primaryLightColor,
                main: theme.primaryColor,
                dark: theme.primaryDarkColor,
                mainContrast: theme.primaryColor,
                contrastText: "#ffffff",
                loaderColor: theme.primaryColor,
            },
            secondary: {
                light: "rgba(111, 235, 179, 1)",
                main: "rgba(57, 190, 131, 1)",
                dark: "rgba(24, 155, 97, 1)",
                contrastText: "#ffffff",
            },
            text: {
                primary: "#565F5A",
                secondary: "#7A7A7A",
                light: "#C4C4C4",
                focus: "#dcdcdc",
                disabled: "rgba(86, 95, 90, 0.51)",
                title: "#000000",
                hint: "rgba(0, 0, 0, 0.38)",
                colored: theme.primaryColor,
                coloredLight: lightenColor(theme.primaryColor, 20),
                fixed: "#565F5A",
                contrasted: "#000000",
            },
            background: {
                paper: "#ffffff",
                default: "#fafafa",
                light: "#f0f0f1",
                dark: "#f0f0f1",
                grey: "#F7F7F7",
                reaction: "#e4efff",
                card: "#ffffff",
                constant: "#1F242F",
            },
            boxShadow: {
                main: boxShadowLight,
                white: boxShadowLightWhite,
            },
            border: {
                main: borderLight,
                input: borderInput,
                colored: borderLight,
                reaction: borderReactionLight,
                medium: borderMedium,
                dark: borderDark,
            },
            input: {
                placeholder: "#c8cbca",
            },
            hover: {
                select: "#edf3f9",
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
                primary: "#d8d8d8",
                secondary: "#CDCDCD",
                light: "#8f8f96",
                focus: "#39485d",
                dark: "#ffffff",
                title: "#ffffff",
                disabled: "rgba(86, 95, 90, 0.51)",
                hint: "rgba(0, 0, 0, 0.38)",
                colored: "#ffffff",
                coloredLight: "#C4C4C4",
                fixed: "#565F5A",
                contrasted: "#ffffff",
            },
            background: {
                paper: backgroundMedium,
                default: background,
                card: background,
                dark: backgroundDark,
                light: "#3d4058",
                grey: "#222e3d",
                reaction: "#3c4d66",
                constant: "#1F242F",
            },
            boxShadow: {
                main: boxShadowDark,
                white: boxShadowDarkWhite,
            },
            border: {
                main: borderDark,
                input: borderInput,
                colored: borderWhite,
                reaction: borderReactionDark,
                medium: `1px solid ${textColorLight}`,
                dark: borderWhite,
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
