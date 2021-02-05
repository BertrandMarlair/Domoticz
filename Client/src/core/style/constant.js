export const primary = "#05cd69";
export const primaryLight = "#12ea7e";
export const primaryDark = "#07a757";

export const secondaryLight = "#39BE83";
export const secondaryDark = "#39BE83";

export const borderInput = "1px solid #cccccc";
export const borderLight = "1px solid #4e4e4e";
export const borderMedium = "1px solid #e2e0e4";
export const borderDark = "1px solid #343434";

export const dangerColor = "#EB5757";
export const linkColor = "#4891FF";

export const textColorLight = "#CDCDCD";
export const textColorDark = "#72757C";
export const textColorDisabled = "#888888";
export const textColorWhite = "#ffffff";

export const background = "#1E2024";
export const backgroundPaper = "#2d3339";
export const backgroundLight = "#F2F2F2";
export const backgroundCard = "#D6D6D744";
export const backgroundCardOff = "#D6D6D755";
export const backgroundCardOn = "#F2F2F2";

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

export const boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.35)";

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
export const mediaQuerySizeXs = 940;
export const mediaQuerySizeXxs = 720;

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
