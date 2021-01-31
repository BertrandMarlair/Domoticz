import {modalStyles} from "../config/Style";

const style = () => ({
    wrapperStatus: {
        display: "flex",
        "& Label": {
            marginLeft: 0,
            marginRight: 10,
        },
    },
    ...modalStyles,
});

export default style;
