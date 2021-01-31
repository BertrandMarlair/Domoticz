import {managePageStyles} from "../config/Style";

const style = (theme) => ({
    navItemActive: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow.main,
        borderBottom: "1px solid transparent",
        borderRadius: 10,
    },
    ...managePageStyles,
});

export default style;
