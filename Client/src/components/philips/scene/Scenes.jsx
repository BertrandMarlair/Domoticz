/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ScenesStyle";
import {useSelector} from "react-redux";
import GroupPage from "./GroupPage";
import LightPage from "./LightPage";
import Error from "../../error/Error";

const Scenes = ({classes}) => {
    const [selectedGroup, setSelectedGroup] = useState(null);

    const hue = useSelector((state) => state.devices.philipsHue);

    const failToConnect = () => {
        let errors = [];

        if (hue?.bridges) {
            for (let bridge of hue.bridges) {
                if (bridge.connection === false) {
                    errors.push(bridge.ipAddress);
                }
            }
        }

        if (errors.length > 0) {
            return errors.map((ipAddress, index) => {
                return <Error key={`error/${index}`} errorMessage={`fail to connect to the bridge (${ipAddress})`} />;
            });
        }

        return <></>;
    };

    const page = () => {
        if (selectedGroup?.groupId) {
            return <LightPage hue={hue} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />;
        }
        return <GroupPage hue={hue} setSelectedGroup={setSelectedGroup} />;
    };

    return (
        <div className={classes.root}>
            {failToConnect()}
            {page()}
        </div>
    );
};

export default withStyles(style)(Scenes);
