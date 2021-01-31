/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ScenesStyle";
import {useSelector} from "react-redux";
import GroupPage from "./GroupPage";
import LightPage from "./LightPage";

const Scenes = ({classes}) => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const hue = useSelector((state) => state.devices.philipsHue);

    const page = () => {
        if (selectedGroup?.groupId) {
            return <LightPage hue={hue} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />;
        }
        return <GroupPage hue={hue} setSelectedGroup={setSelectedGroup} />;
    };

    return <div className={classes.root}>{page()}</div>;
};

export default withStyles(style)(Scenes);
