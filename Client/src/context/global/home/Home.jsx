import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./HomeStyle";
import Hours from "./components/hours/Hours";
import Thermostat from "./components/thermostat/Thermostat";
import Actions from "./components/actions/Actions";

const Home = ({classes}) => {
    return (
        <div className={classes.root}>
            <div className={classes.leftSidenav}>
                <div className={classes.wrapperMain}>
                    <Hours />
                    <Thermostat />
                </div>
                <div className={classes.wrapperAction}>
                    <Actions />
                </div>
            </div>
            <div className={classes.rightSidenav}></div>
        </div>
    );
};

export default withStyles(style)(Home);
