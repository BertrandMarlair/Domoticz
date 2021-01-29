/* eslint-disable no-unused-vars */
import CircularSlider from "../../../../../components/circularSlider/CircularSlider";
import React, {Fragment, useState} from "react";
import {useTheme, withStyles} from "@material-ui/core";
import style from "./ThermostatStyle";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import Icon from "../../../../../components/icon/Icon";
import Text from "../../../../../components/typography/Text";
import Button from "../../../../../components/button/Button";
import {useSelector} from "react-redux";

const Thermostat = ({classes}) => {
    const min = 16;
    const max = 24;
    const heat = 20.5;
    const away = 17;

    const heating = true;

    const [degree, setDegree] = useState(180);

    const temperature = parseFloat(((degree / 360) * (max - min) + min).toFixed(1));

    const weather = useSelector((state) => state.weather);
    const theme = useTheme();

    const setNewTemperature = (temp) => {
        setDegree(((temp - min) / 8) * 360);
    };

    const handleSetStatus = (stt) => {
        switch (stt) {
            case "HEAT":
                setNewTemperature(heat);
                break;
            case "OFF":
                setNewTemperature(min);
                break;
            case "AWAY":
                setNewTemperature(away);
                break;
        }
    };

    const decreaseTemperature = () => {
        setNewTemperature(away);
    };

    const increaseTemperature = () => {
        setNewTemperature(heat);
    };

    const offTemperature = () => {
        if (temperature === min) {
            increaseTemperature();
        } else {
            setNewTemperature(min);
        }
    };

    return (
        <Fragment>
            <div className={classes.root}>
                <div className={classes.gauge}>
                    <svg width="100%" height="100%" viewBox="0 0 600 600">
                        <g transform="translate(300,300)" style={{fill: "none", stroke: "black"}}>
                            <circle
                                r="225"
                                style={{
                                    strokeWidth: "12px",
                                    strokeDasharray: "2,31.3",
                                    stroke: theme.palette.text.dark,
                                }}
                                transform="rotate(87.5)"
                            />
                            <rect
                                width="500"
                                height="80"
                                x="-250"
                                y="160"
                                style={{fill: theme.palette.background.dark, strokeWidth: "0"}}
                            />
                        </g>
                    </svg>
                </div>
                <div
                    className={classes.cursor}
                    style={{transform: `rotate(${Math.round(-135 + (degree / 360) * 270)}deg)`}}>
                    <svg width="100%" height="100%" viewBox="0 0 300 300">
                        <circle cx="119" cy="134" r="119" fill="#fff" />
                        <path
                            fill="#fff"
                            d="M115.441 6.934c1.488-2.898 5.63-2.898 7.118 0l3.843 7.49c1.366 2.662-.567 5.826-3.558 5.826h-7.688c-2.991 0-4.924-3.165-3.558-5.826l3.843-7.49z"
                        />
                        <path
                            fill="#C4C4C4"
                            d="M117.268 8c.77-1.333 2.694-1.333 3.464 0l3.464 6c.77 1.333-.192 3-1.732 3h-6.928c-1.54 0-2.502-1.667-1.732-3l3.464-6z"
                        />
                    </svg>
                </div>
                <div className={classes.circle}>
                    <CircularSlider
                        width={335}
                        limit={270}
                        dataIndex={degree}
                        offsetAngle={-45}
                        labelOffset={0}
                        direction={1}
                        knobPosition="bottom"
                        valueFontSize="2rem"
                        renderLabelValue={null}
                        progressLineCap="flat"
                        progressSize={0}
                        trackSize={0}
                        knobColor="white"
                        knobSize={40}
                        range={200}
                        value={degree}
                        onChange={(e) => setDegree(e ?? 0)}
                    />
                    <div className={classes.thermostat}>
                        <div
                            className={classes.thermostatInner}
                            style={
                                temperature > 19
                                    ? {
                                          background:
                                              "linear-gradient(212deg, rgb(239, 109, 94) 0%, rgb(248, 188, 108) 100%)",
                                      }
                                    : {
                                          background: theme.palette.background.light,
                                      }
                            }>
                            <div className={classes.currentTemperature}>
                                <SmallTitle className={classes.currentRoomText}>Salon</SmallTitle>
                            </div>
                            <div className={classes.currentTemperature}>
                                <SmallTitle className={classes.currentTemperatureText}>19.5</SmallTitle>
                                <SmallTitle className={classes.currentTemperatureLabel}>c°</SmallTitle>
                            </div>
                            {status !== "OFFS" && (
                                <div className={classes.askTemperature}>
                                    <SmallTitle className={classes.askTemperatureText}>{temperature}</SmallTitle>
                                    <SmallTitle className={classes.askTemperatureLabel}>c°</SmallTitle>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.temperatureText}>
                    <Text>{min}c°</Text>
                    <Text>{max}c°</Text>
                </div>
                <div className={classes.controlPanel}>
                    <Button
                        color={temperature === away ? "primary" : "transparent"}
                        onClick={() => decreaseTemperature()}
                        size="sm">
                        Away
                    </Button>
                    <Button color={temperature === min ? "white" : "primaryDark"} icon onClick={() => offTemperature()}>
                        <Icon>Power</Icon>
                    </Button>
                    <Button
                        color={temperature === heat ? "primary" : "transparent"}
                        size="sm"
                        onClick={() => increaseTemperature()}>
                        Heat
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default withStyles(style)(Thermostat);
