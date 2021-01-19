/* eslint-disable */
import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./ActionsStyle";
import Switch from "../../../../../components/switch/Switch";
import Icon from "../../../../../components/icon/Icon";
import Text from "../../../../../components/typography/Text";
import Card from "../../../../../components/card/Card";

const Actions = ({classes}) => {
    const actions = [
        {
            icon: "Snowflake",
            title: "Arrivé à la maison",
            colorFrom: "#21B4F2",
            colorTo: "#723BF4",
            on: true,
        },
        {
            icon: "Snowflake",
            title: "Arrivé à la maison",
            colorFrom: "#21B4F2",
            colorTo: "#723BF4",
            on: false,
        },
        {
            icon: "Snowflake",
            title: "Arrivé à la maison",
            colorFrom: "#EF6D5E",
            colorTo: "#F8BC6C",
            on: true,
        },
        {
            icon: "Snowflake",
            title: "Arrivé à la maison",
            colorFrom: "#1BD3A5",
            colorTo: "#337CDE",
            on: true,
        },
    ];
    return (
        <div className={classes.root}>
            {actions.map((action, index) => {
                return (
                    <Card 
                        key={`action/${index}`} 
                        className={classes.action}
                        style={{
                            background: action.on && `linear-gradient(195deg, ${action.colorFrom} 0%, ${action.colorTo} 100%)`
                        }}
                    >
                        <div className={classes.actionHeader}>
                            <Text>Switch</Text>
                            <Switch checked={true} />
                        </div>
                        <Icon className={classes.actionIcon} size={45}>{action.icon}</Icon>
                        <Text className={classes.actionTitle}>Arrivé à maison</Text>
                        <Text>( ON )</Text>
                    </Card>
                )
            })}
        </div>
    );
};

export default withStyles(style)(Actions);
