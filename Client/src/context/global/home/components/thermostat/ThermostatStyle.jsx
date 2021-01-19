import {boxShadowLight, borderLight} from "../../../../../core/style/constant";

const style = (theme) => ({
    root: {
        display: "flex",
        marginRight: 15,
        width: 300,
        position: "relative",
    },
    thermostat: {
        width: 220,
        height: 220,
        background: theme.palette.background.light,
        boxShadow: boxShadowLight,
        position: "absolute",
        borderRadius: "100%",
        top: 30,
        left: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    currentTemperature: {
        display: "flex",
    },
    currentTemperatureText: {
        fontSize: "2.5rem",
        fontWeight: 400,
    },
    currentTemperatureLabel: {
        fontSize: "1.5rem",
        fontWeight: 300,
        lineHeight: "65px",
        marginLeft: 5,
    },
    askTemperature: {
        display: "flex",
    },
    askTemperatureText: {
        fontSize: "1.5rem",
        fontWeight: 300,
    },
    askTemperatureLabel: {
        fontSize: "1.2rem",
        fontWeight: 300,
        lineHeight: "38px",
        marginLeft: 5,
    },
    wheather: {
        display: "flex",
        alignItems: "center",
    },
    outDoor: {},
    outDourTemperature: {
        fontSize: "2rem",
        fontWeight: 300,
        lineHeight: "38px",
        marginLeft: 5,
    },
    divider: {
        borderLeft: borderLight,
        height: 66,
        margin: "0 10px",
    },
    weatherInfo: {
        display: "flex",
        alignItems: "center",
        margin: "4px 0",
    },
    weatherInfoIcon: {
        marginRight: 7,
    },
});

export default style;
