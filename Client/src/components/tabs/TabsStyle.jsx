import {displayBetweenResponsive, displayBetween} from "../../core/style/constant";

const style = () => ({
    root: {
        margin: "15px 0",
        borderRadius: 5,
        ...displayBetweenResponsive,
        width: "auto",
    },
    wrapper: {
        ...displayBetween,
    },
    fullWidth: {
        width: "100%",
    },
});

export default style;
