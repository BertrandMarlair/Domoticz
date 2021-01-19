import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./WeatherStyle";

const Weather = ({classes}) => {
    return <div className={classes.root}>Weather</div>;
};

export default withStyles(style)(Weather);
