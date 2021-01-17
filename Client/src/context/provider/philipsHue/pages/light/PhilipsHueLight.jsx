/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueLightStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";

const PhilipsHueLight = ({classes}) => {
    const philipsHue = useSelector((state) => state.devices.philipsHue);

    const getLight = () => {
        let light = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let bridge of philipsHue.bridges) {
                if (bridge?.lights) {
                    light = [...light, ...bridge.lights];
                }
            }
        }

        return light;
    };

    return (
        <div className={classes.root}>
            <GoBack />
            <Title className={classes.title} bold>
                Configuration de la lumière
            </Title>
            <Grid container>
                {getLight().map((light, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`light/${index}`}>
                            <Card className={classes.light}>
                                <Icon size={40} className={classes.lightIcon}>
                                    {light.productname}
                                </Icon>
                                <SmallTitle className={classes.lightTitle}>{light.name}</SmallTitle>
                                <Button fullWidth>Configurer</Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default withStyles(style)(PhilipsHueLight);
