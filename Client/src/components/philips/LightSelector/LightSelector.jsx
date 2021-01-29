import React, {useState, useEffect} from "react";
import {makeStyles, withStyles, IconButton} from "@material-ui/core";
import style from "./LightSelectorStyle";
import Switch from "../../switch/Switch";
import Icon from "../../icon/Icon";
import Text from "../../typography/Text";
import Card from "../../card/Card";
import SmallTitle from "../../typography/SmallTitle";
import {useDispatch} from "react-redux";
import {EDIT_LIGHT_STATE, SYNC_DEVICE} from "../../../core/reducers/devicesConfig";
import classNames from "classnames";
import Slider from "./Slider";
import {brightnessRatio} from "../../../core/constants";
import {useMutation} from "react-apollo";
import gql from "graphql-tag";
import {philipsHueFragment} from "../../../app/SyncDevices";
import {cieToRGB, colorTemperatureToHex, sortColors, getContrasted} from "../../../core/philips/color";

const LightSelector = ({
    classes,
    device: defaultDevice,
    setSelectedGroup,
    hue,
    editingGroup,
    setEditingGroup,
    editingLight,
    setEditingLight,
    header,
    update,
}) => {
    const brightness = brightnessRatio / 100;
    const dispatch = useDispatch();
    const syncLightPhilipsHue = (payload) => dispatch({type: EDIT_LIGHT_STATE, payload});
    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const [isChanging, setIsChanging] = useState(false);
    const [value, setValue] = useState(0);
    const [device, setDevice] = useState(defaultDevice);

    const [editGroupState, editGroupStateData] = useMutation(EDIT_GROUP);
    const [editLightState, editLightStateData] = useMutation(EDIT_LIGHT);

    useEffect(() => {
        if (editGroupStateData?.data?.editGroupState) {
            syncPhilipsHue({...editGroupStateData?.data?.editGroupState, force: true});
        }
    }, [editGroupStateData]);

    useEffect(() => {
        if (editLightStateData?.data?.editLightState) {
            syncPhilipsHue({...editLightStateData?.data?.editLightState, force: true});
        }
    }, [editLightStateData]);

    useEffect(() => {
        setDevice(defaultDevice);
    }, [update]);

    useEffect(() => {
        if (!isChanging) {
            if (editingGroup !== device?.groupId && device?.lights) {
                const group = hue?.bridges
                    .map((bridge) => bridge.groups)
                    .flat()
                    .find((g) => g?.groupId === device?.groupId);
                const totalBri = group.lights.map((l) => l.state.bri).reduce((acc, cur) => acc + cur);

                setValue(Math.round(totalBri / group.lights.length / brightness));
                setDevice(group);
            } else if (editingLight !== device?.lightId) {
                const light = hue?.bridges
                    .map((bridge) => bridge.lights)
                    .flat()
                    .find((l) => l?.lightId === device?.lightId);

                if (light) {
                    setValue(Math.round(light.state.bri / brightness));
                    setDevice(light);
                }
            }
        }
    }, [hue, device]);

    const getLightBri = (newValue, currentDevice) => {
        if (currentDevice?.lights) {
            editGroupState({
                variables: {
                    bridgeId: device.bridgeId,
                    groupId: device.groupId,
                    state: {bri: Math.round(newValue * brightness)},
                },
            });
        } else {
            editLightState({
                variables: {
                    bridgeId: device.bridgeId,
                    lightId: device.lightId,
                    state: {bri: Math.round(newValue * brightness)},
                },
            });
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleEndChange = (newValue) => {
        if (device?.groupId) {
            setEditingGroup && setEditingGroup(device.groupId);
        } else {
            setEditingLight && setEditingLight(device.lightId);
        }
        setTimeout(() => {
            getLightBri(newValue, device);
        }, 150);
        setTimeout(() => {
            if (device?.groupId) {
                setEditingGroup && setEditingGroup(null);
            } else {
                setEditingLight && setEditingLight(null);
            }
            setIsChanging(false);
        }, 1000);
        setValue(newValue);
    };

    const getDescription = () => {
        let lightOnCount = 0;

        if (device?.groupId) {
            for (let sceneLight of device.lights) {
                if (sceneLight?.state?.on) {
                    lightOnCount++;
                }
            }
        } else {
            return "Aucune lumière configurée";
        }

        if (lightOnCount === 0) {
            return "Toutes les lumières sont éteintes";
        } else if (lightOnCount === device.lights.length) {
            return "Toutes les lumières sont allumée";
        }
        if (lightOnCount === 1) {
            return "1 lumière est allumée";
        }
        return `${lightOnCount} lumières sont allumées`;
    };

    const handleChangeLightState = (params) => {
        let lights = [];

        if (device?.groupId) {
            for (let groupLight of device.lights) {
                lights = [...lights, {state: params, bridgeId: groupLight.bridgeId, lightId: groupLight.lightId}];
            }

            editGroupState({
                variables: {
                    bridgeId: device.bridgeId,
                    groupId: device.groupId,
                    state: params,
                },
            });
        } else {
            lights = [{state: params, bridgeId: device.bridgeId, lightId: device.lightId}];

            editLightState({
                variables: {
                    bridgeId: device.bridgeId,
                    lightId: device.lightId,
                    state: params,
                },
            });
        }

        syncLightPhilipsHue(lights);
    };

    const getColors = () => {
        if (device?.lights) {
            const lights = device.lights.filter((l) => l.state.on);

            if (lights.length > 1) {
                let colors = [];

                for (let lightIndex in lights) {
                    const light = lights[lightIndex];

                    if (light.state.colormode === "xy") {
                        colors.push(cieToRGB(light.state.xy.x, light.state.xy.y));
                    } else if (light.state.colormode === "ct") {
                        colors.push(colorTemperatureToHex(light.state.ct));
                    }
                }
                const orderColors = sortColors(colors);

                return {
                    background: `linear-gradient(90deg, ${orderColors.map(
                        (color, index) => `${color} ${index === 0 ? "30%" : ""} ${index === 1 ? "60%" : ""}`,
                    )} 95%)`,
                    color: getContrasted(orderColors[0]),
                };
            } else if (lights.length === 1) {
                const light = lights[0];

                if (light.state.colormode === "xy") {
                    const color = cieToRGB(light.state.xy.x, light.state.xy.y);

                    return {
                        background: color,
                        color: getContrasted(color),
                    };
                } else if (light.state.colormode === "ct") {
                    const color = colorTemperatureToHex(light.state.ct);

                    return {
                        background: color,
                        color: getContrasted(color),
                    };
                }
            }
        } else if (device.state.colormode === "xy") {
            const color = cieToRGB(device.state.xy.x, device.state.xy.y);

            return {
                background: color,
                color: getContrasted(color),
            };
        } else if (device.state.colormode === "ct") {
            const color = colorTemperatureToHex(device.state.ct);

            return {
                background: color,
                color: getContrasted(color),
            };
        }
    };

    const getState = !!(device.groupId ? device?.state?.any_on : device?.state?.on);
    const lightsColor = getState && getColors();
    const name = device?.name;
    const icon = device?.class ?? device?.productname;
    const description = isChanging ? `${value} %` : getDescription();

    const useStyles = makeStyles({
        root: {
            "&:before": {
                background: lightsColor?.background,
                opacity: getState ? 1 : 0,
            },
        },
    });

    const rootClasses = useStyles();

    const containerClasses = classNames({
        [classes.root]: true,
        [rootClasses.root]: true,
    });

    const wrapperClasses = classNames({
        [classes.wrapper]: true,
        [classes.wrapperChanging]: isChanging,
    });

    if (header) {
        return (
            <Card className={containerClasses}>
                <div className={wrapperClasses}>
                    <div className={classes.wrapperText}>
                        <IconButton onClick={() => setSelectedGroup(null)}>
                            <Icon color={getState && lightsColor?.color}>Left</Icon>
                        </IconButton>
                        <div className={classes.texts}>
                            <SmallTitle style={{color: getState && lightsColor?.color}} className={classes.title}>
                                {name}
                            </SmallTitle>
                        </div>
                    </div>
                    <div className={classes.switch} onClick={() => handleChangeLightState({on: !getState})}>
                        <Switch checked={getState} />
                    </div>
                </div>
                <Slider
                    opened={getState}
                    lightsColor={lightsColor?.background}
                    isChanging={isChanging}
                    setIsChanging={setIsChanging}
                    value={value}
                    handleChange={handleChange}
                    handleEndChange={handleEndChange}
                />
            </Card>
        );
    }

    return (
        <Card className={containerClasses}>
            <div className={wrapperClasses}>
                <div
                    className={classes.wrapperText}
                    onClick={
                        device?.groupId ? () => setSelectedGroup(device) : () => handleChangeLightState({on: !getState})
                    }>
                    <Icon color={getState && lightsColor?.color} className={classes.icon}>
                        {icon}
                    </Icon>
                    <div className={classes.texts}>
                        <SmallTitle style={{color: getState && lightsColor?.color}} className={classes.title}>
                            {name}
                        </SmallTitle>
                        {device?.groupId && (
                            <Text style={{color: getState && lightsColor?.color}} className={classes.description}>
                                {description}
                            </Text>
                        )}
                    </div>
                </div>
                <div
                    className={device?.groupId ? classes.switch : classes.switchSmall}
                    onClick={() => handleChangeLightState({on: !getState})}>
                    <Switch checked={getState} />
                </div>
            </div>
            <Slider
                opened={getState}
                lightsColor={lightsColor?.background}
                isChanging={isChanging}
                setIsChanging={setIsChanging}
                value={value}
                handleChange={handleChange}
                handleEndChange={handleEndChange}
            />
        </Card>
    );
};

export default withStyles(style)(LightSelector);

const EDIT_GROUP = gql`
    mutation editGroupState($bridgeId: ID!, $groupId: ID!, $state: PhilipsHueStateInput!) {
        editGroupState(bridgeId: $bridgeId, groupId: $groupId, state: $state) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;

const EDIT_LIGHT = gql`
    mutation editLightState($bridgeId: ID!, $lightId: ID!, $state: PhilipsHueStateInput!) {
        editLightState(bridgeId: $bridgeId, lightId: $lightId, state: $state) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
