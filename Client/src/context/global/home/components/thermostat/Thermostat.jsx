/* eslint-disable */
import CircularSlider from "@fseehawer/react-circular-slider";
import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ThermostatStyle";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import Icon from "../../../../../components/icon/Icon";
import Text from "../../../../../components/typography/Text";

const Thermostat = ({classes}) => {
    const [value2, setValue2] = useState(30);

    return (
        <div className={classes.root}>
            <CircularSlider
                min={160}
                max={240}
                width={280}
                dataIndex={20}
                labelColor="#005a58"
                knobColor="#fff"
                knobSize={45}
                progressColorFrom="#24adf3"
                progressColorTo="#f07960"
                progressSize={5}
                trackColor="#eeeeee"
                trackSize={1}
                direction={1}
                knobPosition="bottom"
                hideLabelValue={true}
            />
            <div className={classes.thermostat}>
                <div className={classes.wheather}>
                    <div className={classes.outDoor}>
                        <SmallTitle className={classes.outDourTemperature}>5°</SmallTitle>
                    </div>
                    <div className={classes.divider}/>
                    <div className={classes.wheaterData}>
                        <div className={classes.weatherInfo}>
                            <Icon size={18} className={classes.weatherInfoIcon}>Snowflake</Icon>
                            <Text>22 %</Text>
                        </div>
                        <div className={classes.weatherInfo}>
                            <Icon size={18} className={classes.weatherInfoIcon}>Snowflake</Icon>
                            <Text>22 %</Text>
                        </div>
                        <div className={classes.weatherInfo}>
                            <Icon size={18} className={classes.weatherInfoIcon}>Snowflake</Icon>
                            <Text>22 %</Text>
                        </div>
                    </div>
                </div>
                <div className={classes.currentTemperature}>
                    <SmallTitle className={classes.currentTemperatureText}>19.5</SmallTitle>
                    <SmallTitle className={classes.currentTemperatureLabel}>c°</SmallTitle>
                </div>
                <div className={classes.askTemperature}>
                    <SmallTitle className={classes.askTemperatureText}>19.0</SmallTitle>
                    <SmallTitle className={classes.askTemperatureLabel}>c°</SmallTitle>
                </div>
            </div>
        </div>
    );
};

export default withStyles(style)(Thermostat);
