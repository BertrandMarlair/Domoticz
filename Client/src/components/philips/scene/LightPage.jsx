import React, {useState} from "react";
import {withStyles, IconButton, useTheme} from "@material-ui/core";
import style from "./ScenesStyle";
import LightSelector from "../LightSelector/LightSelector";
import Icon from "../../icon/Icon";
import SceneSelector from "../SceneSelector/SceneSelector";
import ColorSelector from "../ColorSelector/ColorSelector";

const LightPage = ({classes, selectedGroup, setSelectedGroup, hue}) => {
    const [editingGroup, setEditingGroup] = useState(null);
    const [editingLight, setEditingLight] = useState(null);
    const [target, setTarget] = useState(0);

    const theme = useTheme();

    const targetPage = () => {
        switch (target) {
            case 0:
                return selectedGroup.lights.map((light, index) => {
                    return (
                        <LightSelector
                            hue={hue}
                            device={light}
                            key={`group/${index}`}
                            setSelectedGroup={setSelectedGroup}
                            editingLight={editingLight}
                            setEditingLight={setEditingLight}
                            setEditingGroup={setEditingGroup}
                        />
                    );
                });
            case 1:
                return <SceneSelector group={selectedGroup} setSelectedGroup={setSelectedGroup} />;
            case 2:
                return <ColorSelector hue={hue} device={selectedGroup} setSelectedGroup={setSelectedGroup} />;
            default:
                return <></>;
        }
    };

    return (
        <div className={classes.root}>
            <LightSelector
                header
                hue={hue}
                device={selectedGroup}
                editingGroup={editingGroup}
                setEditingGroup={setEditingGroup}
                setSelectedGroup={setSelectedGroup}
                setEditingLight={setEditingLight}
            />
            <div className={classes.iconContainer}>
                <IconButton
                    className={classes.iconButton}
                    style={{backgroundColor: theme.palette.background.light}}
                    onClick={() => setSelectedGroup(null)}>
                    <Icon color="white">Left</Icon>
                </IconButton>
                <div className={classes.iconLeftContainer}>
                    <IconButton
                        className={classes.iconButton}
                        style={{backgroundColor: target === 0 ? "white" : theme.palette.background.light}}
                        onClick={() => setTarget(0)}>
                        <Icon color={target === 0 ? theme.palette.background.light : "white"}>List</Icon>
                    </IconButton>
                    <IconButton
                        className={classes.iconButton}
                        style={{backgroundColor: target === 1 ? "white" : theme.palette.background.light}}
                        onClick={() => setTarget(1)}>
                        <Icon color={target === 1 ? theme.palette.background.light : "white"}>Palette</Icon>
                    </IconButton>
                    <IconButton
                        className={classes.iconButton}
                        style={{backgroundColor: target === 2 ? "white" : theme.palette.background.light}}
                        onClick={() => setTarget(2)}>
                        <Icon>Color</Icon>
                    </IconButton>
                </div>
            </div>
            {targetPage()}
        </div>
    );
};

export default withStyles(style)(LightPage);
