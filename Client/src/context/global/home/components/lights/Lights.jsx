import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./LightsStyle";
import Scenes from "../../../../../components/philips/scene/Scenes";

const Lights = ({classes}) => {
    return (
        <div className={classes.root}>
            <Scenes />
        </div>
    );
};

export default withStyles(style)(Lights);
