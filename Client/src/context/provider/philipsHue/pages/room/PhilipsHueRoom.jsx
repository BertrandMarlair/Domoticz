/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueRoomStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";
import Text from "../../../../../components/typography/Text";

const PhilipsHueRoom = ({classes}) => {
    const philipsHue = useSelector((state) => state.devices.philipsHue);

    const getRoomCount = () => {
        let rooms = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let bridge of philipsHue.bridges) {
                if (bridge?.groups) {
                    rooms = [...rooms, ...bridge.groups];
                }
            }
        }

        return rooms;
    };

    return (
        <div className={classes.root}>
            <GoBack />
            <Title className={classes.title} bold>
                Gestion des Pièces et zones
            </Title>
            <Grid container>
                {getRoomCount().map((room, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`room/${index}`}>
                            <Card className={classes.room}>
                                <Icon size={40} className={classes.roomIcon}>
                                    {room.class}
                                </Icon>
                                <SmallTitle className={classes.roomTitle}>{room.name}</SmallTitle>
                                <Text className={classes.roomTitle}>{room.lights.length} lumières Hue</Text>
                                <Button fullWidth>Configurer</Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default withStyles(style)(PhilipsHueRoom);
