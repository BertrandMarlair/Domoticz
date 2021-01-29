import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ScenesStyle";
import LightSelector from "../LightSelector/LightSelector";

const GroupPage = ({classes, hue, setSelectedGroup}) => {
    const [devices, setDevices] = useState([]);
    const [editingGroup, setEditingGroup] = useState(null);

    useEffect(() => {
        const groups = hue?.bridges.map((bridge) => bridge.groups);

        if (groups?.length) {
            setDevices(groups.flat());
        }
    }, [hue]);

    return (
        <div className={classes.root}>
            {devices.map((device, index) => {
                return (
                    <LightSelector
                        hue={hue}
                        device={device}
                        key={`group/${index}`}
                        setSelectedGroup={setSelectedGroup}
                        editingGroup={editingGroup}
                        setEditingGroup={setEditingGroup}
                    />
                );
            })}
        </div>
    );
};

export default withStyles(style)(GroupPage);
