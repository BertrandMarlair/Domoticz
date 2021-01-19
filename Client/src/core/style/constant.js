export const primary = "#05cd69";
export const primaryLight = "#12ea7e";
export const primaryDark = "#05cd69";

export const secondaryLight = "#39BE83";
export const secondaryDark = "#39BE83";

export const borderInput = "1px solid #cccccc";
export const borderLight = "1px solid #4e4e4e";
export const borderMedium = "1px solid #e2e0e4";
export const borderDark = "1px solid #2a3544";
export const borderWhite = "1px solid #ffffff";
export const borderLeft = "4px solid #cccccc";
export const borderReactionLight = "1px solid #8caeff";
export const borderReactionDark = "1px solid #708bcc";

export const dangerColor = "#EB5757";
export const linkColor = "#4891FF";

export const textColorLight = "#565F5A";
export const textColorDark = "#C4C4C4";
export const textColorLightGrey = "#dad4d4";

export const background = "#2c2d43";
export const backgroundDark = "#2c2d43";
export const backgroundMedium = "#2f3247";
export const backgroundWhite = "#ffffff";

export const blueLight = {
    primary: "#2261A1",
    primaryLight: "#428cd7",
    primaryDark: "#0d263f",
};

export const green = {
    primary: "#0D4524",
    primaryLight: "#1c964e",
    primaryDark: "#04150b",
};

export const greenLight = {
    primary: "#156B39",
    primaryLight: "#26c066",
    primaryDark: "#0d4022",
};

export const red = {
    primary: "#691A16",
    primaryLight: "#A62E21",
    primaryDark: "#3f100d",
};

export const redLight = {
    primary: "#A62E21",
    primaryLight: "#d94f40",
    primaryDark: "#40120d",
};

export const yellow = {
    primary: "#cccc00",
    primaryLight: "#d6d632",
    primaryDark: "#a3a300",
};

export const dark = {
    primary: "#2E2E2E",
    primaryLight: "#595959",
    primaryDark: "#0d0d0d",
};

export const light = {
    primary: "#DFDFDF",
    primaryLight: "#ebebeb",
    primaryDark: "#b2b2b2",
};

export const grey = {
    primary: "#696B7A",
    primaryLight: "#94959B",
    primaryDark: "#484952",
};

export const error = {
    main: "#EB5701",
    light: "#e57373",
    dark: "#CD4B00",
    contrastText: "#ffffff",
};

export const success = {
    main: "#13B760",
    light: "#2BD87C",
    dark: "#08AA54",
    contrastText: "#ffffff",
};

export const warning = {
    main: "#de7e00",
    light: "#fc9403",
    dark: "#ba6b03",
    contrastText: "#ffffff",
};

export const white = {
    main: "#ffffff",
    light: "#D9D9D9",
    contrastText: "#565F5A",
    contrast: "#000000",
};

export const link = {
    main: "#4891FF",
    light: "#6ca1f2",
    dark: "#2476f2",
};

export const boxShadowLight = "0px 0px 10px rgba(0, 0, 0, 0.35)";
export const boxShadowDark = "0px 0px 20px rgb(43 46 66)";
export const boxShadowLightWhite = "0px 12px 28px #bfc1d4";
export const boxShadowDarkWhite = "0px 12px 28px #0f101f";

export const strongWhiteBorder = "5px solid #eee";

// rem
export const remXXXs = "0,6875rem";
export const remXXS = "0.65rem";
export const remXs = "0.75rem";
export const remS = "0.85rem";
export const remM = "0.9rem";
export const remMl = "1.05rem";
export const remL = "1.15rem";
export const remXl = "1.35rem";
export const remXXl = "1.60rem";
export const remXXXl = "2.75rem";

// font size
export const sizeXs = 300;
export const sizeS = 400;
export const sizeSsm = 500;
export const sizeSm = 600;
export const sizeM = 800;
export const sizeMd = 900;
export const sizeL = 1200;
export const sizeXl = "100vw";

export const fontFamily = "Lato";

export const heightAppBar = 43;
export const widthSideBar = 60;

export const mediaQuerySizeXl = 1490;
export const mediaQuerySizeSm = 1279;
export const mediaQuerySizeS = 1059;
export const mediaQuerySizeXs = 700;
export const mediaQuerySizeXxs = 500;

export const displayBetween = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export const displayCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const displayFlex = {
    display: "flex",
    justifyContent: "space-between",
};

export const displayFlexResponsive = {
    display: "flex",
    justifyContent: "space-between",
    [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
        flexDirection: "column",
        alignItems: "center",
    },
};

export const displayBetweenResponsive = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [`@media (max-width: ${mediaQuerySizeXs}px)`]: {
        flexDirection: "column",
    },
};

export const displayBetweenStartResponsive = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
        flexDirection: "column",
    },
};

export const displayBetweenEndResponsive = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    [`@media (max-width: ${mediaQuerySizeSm}px)`]: {
        flexDirection: "column",
    },
};

export const displayVerticalCenter = {
    display: "flex",
    alignItems: "center",
};
