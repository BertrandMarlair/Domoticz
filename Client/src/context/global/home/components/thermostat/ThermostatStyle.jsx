const width = 300;

const style = (theme) => ({
    root: {
        paddingBottom: 30,
        position: "relative",
    },
    circle: {
        display: "flex",
        position: "relative",
        margin: "0px 25px",
        marginBottom: "-20px",
    },
    thermostat: {
        top: 50,
        left: 50,
        width: width - 105,
        height: width - 105,
        background: theme.palette.background.light,
        boxShadow: theme.palette.boxShadow.main,
        position: "absolute",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        userSelect: "none",
    },
    thermostatInner: {
        top: 30,
        left: 30,
        width: width - 165,
        height: width - 165,
        display: "flex",
        zIndex: 5,
        position: "absolute",
        background: "#3d4058",
        boxShadow: "0px 0px 20px rgb(13 14 14 / 53%)",
        alignItems: "center",
        borderRadius: "100%",
        flexDirection: "column",
        justifyContent: "center",
        transition: "0.2s",
        userSelect: "none",
    },
    currentRoom: {
        marginBottom: 5,
    },
    currentTemperature: {
        display: "flex",
        marginBottom: -10,
    },
    currentTemperatureText: {
        fontSize: "2rem",
        fontWeight: 400,
    },
    currentRoomText: {
        fontSize: "1.2rem",
        fontWeight: 300,
    },
    currentTemperatureLabel: {
        fontSize: "1.3rem",
        fontWeight: 300,
        lineHeight: "55px",
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
        fontSize: "1.6rem",
        fontWeight: 300,
        lineHeight: "38px",
        marginLeft: 5,
    },
    outDourTemperatureMin: {
        fontSize: "0.8rem",
        fontWeight: 300,
        marginRight: 2,
        textAlign: "right",
    },
    divider: {
        borderLeft: theme.palette.border.main,
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
    weatherCloudIcon: {
        width: 60,
        height: 60,
        margin: "auto",
        display: "block",
        marginBottom: "-10px",
        marginTop: "-10px",
    },
    controlPanel: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
    },
    controlButton: {
        padding: "10px 25px",
        textAlign: "center",
        margin: "0 !important",
        border: "none",
        backgroundColor: "inherit",
        borderRadius: 0,
        minWidth: 0,
        width: "-webkit-fill-available",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    controlButtonTop: {
        padding: "10px 25px",
        borderBottom: theme.palette.border.dark,
        textAlign: "center",
        margin: "0 !important",
        border: "none",
        backgroundColor: "inherit",
        borderRadius: 0,
        minWidth: 0,
        width: "-webkit-fill-available",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    controlButtonBottom: {
        padding: "10px 25px",
        borderTop: theme.palette.border.dark,
        textAlign: "center",
        margin: "0 !important",
        border: "none",
        backgroundColor: "inherit",
        borderRadius: 0,
        minWidth: 0,
        width: "-webkit-fill-available",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    controlButtonTarget: {
        color: theme.palette.primary.main,
    },
    gauge: {
        position: "absolute",
        top: "-56px",
        left: "-31px",
        width: width + 111,
        zIndex: 0,
        userSelect: "none",
    },
    cursor: {
        position: "absolute",
        top: 31,
        left: 71,
        width: width - 40,
        transformOrigin: "39.7% 44.2%",
        transition: "0.5s",
        zIndex: 0,
        userSelect: "none",
    },
    temperatureText: {
        display: "flex",
        justifyContent: "space-between",
        width: width - 65,
        position: "absolute",
        top: 270,
        left: 57,
        userSelect: "none",
    },
});

export default style;
