/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {withStyles} from "@material-ui/core";
import style from "./PhilipsHueRoomStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";

const PhilipsHueRoom = ({classes}) => {
    return (
        <div className={classes.root}>
            <Title className={classes.title} bold>
                Gestion des Pièces et zones
            </Title>
            <Card className={classes.room}>
                <div className={classes.roomHeader}>
                    <Icon size={40} className={classes.roomIcon}>
                        Door
                    </Icon>
                    <div>
                        <SmallTitle className={classes.roomTitle}>Salon</SmallTitle>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(PhilipsHueRoom);
