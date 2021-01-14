import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./style";
const DeviceList = ({classes}) => {
    return <div className={classes.root}>Device List</div>;
};

export default withStyles(style)(DeviceList);
