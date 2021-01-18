/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueBridgeStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";

const PhilipsHueBridge = ({classes}) => {
    const philipsHue = useSelector((state) => state.devices.philipsHue);

    const getBridges = () => {
        let bridge = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let hueBridge of philipsHue.bridges) {
                if (hueBridge?.config) {
                    bridge = [...bridge, hueBridge.config];
                }
            }
        }

        return bridge;
    };

    return (
        <div className={classes.root}>
            <GoBack />
            <Title className={classes.title} bold>
                Configuration des bridges
            </Title>
            <Grid container>
                {getBridges().map((bridge, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`bridge/${index}`}>
                            <Card className={classes.bridge}>
                                <Icon size={40} className={classes.bridgeIcon}>
                                    Bridge
                                </Icon>
                                <SmallTitle center className={classes.bridgeTitle}>
                                    {bridge.name}
                                </SmallTitle>
                                <Button fullWidth>Configurer</Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default withStyles(style)(PhilipsHueBridge);
