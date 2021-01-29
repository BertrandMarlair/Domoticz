import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ActionsStyle";
import Switch from "../../../../../components/switch/Switch";
import Icon from "../../../../../components/icon/Icon";
import Text from "../../../../../components/typography/Text";
import Card from "../../../../../components/card/Card";

const actionsConfig = [
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

const Actions = ({classes}) => {
    const [actions, setActions] = useState(actionsConfig);

    const handleClick = (action, index) => {
        setActions((e) => [...e.slice(0, index), {...action, on: !action.on}, ...e.slice(index + 1)]);
    };

    return (
        <div className={classes.root}>
            {actions.map((action, index) => {
                return (
                    <Card
                        key={`action/${index}`}
                        className={classes.action}
                        onClick={() => handleClick(action, index)}
                        style={{
                            transition: "0.5s",
                            background:
                                action.on && `linear-gradient(212deg, ${action.colorFrom} 0%, ${action.colorTo} 100%)`,
                        }}>
                        <div className={classes.actionHeader}>
                            <Text>Switch</Text>
                            <Switch checked={action.on} />
                        </div>
                        <Icon className={classes.actionIcon} size={45}>
                            {action.icon}
                        </Icon>
                        <Text className={classes.actionTitle}>Arrivé à maison</Text>
                        <Text>( {action.on ? "ON" : "OFF"} )</Text>
                    </Card>
                );
            })}
        </div>
    );
};

export default withStyles(style)(Actions);
