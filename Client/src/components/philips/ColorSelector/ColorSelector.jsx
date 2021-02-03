/* eslint-disable no-unused-vars */
import React, {Fragment, useEffect, useRef, useState} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import style from "./ColorSelectorStyle";
import iro from "../../picker/picker";
import {EventEmitter} from "../../../core/events/events";
import Icon from "../../../components/icon/Icon";
import {cieToRGB, colorTemperatureToHex, hexToRgb, rgbToCie} from "../../../core/philips/color";
import {useDispatch} from "react-redux";
import {EDIT_LIGHT_STATE, SYNC_DEVICE} from "../../../core/reducers/devicesConfig";
import {useMutation} from "react-apollo";
import gql from "graphql-tag";
import {philipsHueFragment} from "../../../app/SyncDevices";
import LightSelector from "../LightSelector/LightSelector";
import {useTheme} from "@material-ui/styles";

const ColorSelector = ({classes, hue, device}) => {
    const canBeColored = ["LST002", "LCT015"];

    const theme = useTheme();

    const [type, setType] = useState("xy");
    const [colorsMode, setColorsMode] = useState([]);
    const picker = useRef();
    const dispatch = useDispatch();
    const [activeColor, setActiveColor] = useState(null);
    const [update, setUpdate] = useState(new Date().getTime());
    const syncLightPhilipsHue = (payload) => dispatch({type: EDIT_LIGHT_STATE, payload});
    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const [editLightState, editLightStateData] = useMutation(EDIT_LIGHT);

    useEffect(() => {
        if (editLightStateData?.data?.editLightState) {
            syncPhilipsHue({...editLightStateData?.data?.editLightState, force: true});
        }
    }, [editLightStateData]);

    const group = hue?.bridges
        .map((bridge) => bridge.groups)
        .flat()
        .find((g) => g?.groupId === device?.groupId);

    const getColors = () => {
        let colorList = [];

        if (group.lights) {
            const lights = group.lights;

            for (let lightIndex in lights) {
                const light = lights[lightIndex];

                if (light?.state?.xy?.x) {
                    const cie = cieToRGB(light?.state.xy.x, light?.state.xy.y);
                    const {r, g, b} = hexToRgb(cie);

                    colorList.push({
                        colorRGB: `rgb(${r}, ${g}, ${b})`,
                        colorHex: cie,
                        lightId: light?.lightId,
                        bridgeId: light?.bridgeId,
                        colormode: light?.state?.colormode,
                        ...light,
                    });
                } else if (light?.state.ct) {
                    const temp = colorTemperatureToHex(light?.state.ct);
                    const {r, g, b} = hexToRgb(temp);

                    colorList.push({
                        colorRGB: `rgb(${r}, ${g}, ${b})`,
                        colorHex: temp,
                        lightId: light?.lightId,
                        bridgeId: light?.bridgeId,
                        colormode: light?.state?.colormode,
                        ...light,
                    });
                }
            }
        }

        return colorList.sort((a, b) => (a.colormode > b.colormode ? -1 : 1));
    };

    const colors = getColors();

    useEffect(() => {
        setType(colors[0].colormode);
        setColorsMode(colors.map((color) => color.colormode));

        let colorPicker = new iro.ColorPicker("#colorPicker", {
            width: 280,
            colors: colors.map((color) => color.colorRGB),
            colorsMode: colors.map((color) => color.colormode),
            colorable: colors.map((color) => color.productname === "Hue color lamp"),
            wheelAngle: 120,
            handleRadius: 25,
            layoutDirection: "horizontal",
            istemp: true,
            type,
            borderColor: "#fff",
            layout: [
                {
                    component: iro.ui.Wheel,
                    options: {
                        sliderType: "kelvin",
                        sliderShape: "circle",
                    },
                },
            ],
        });

        iro.ColorPicker.prototype.setColors = function (newColorValues) {
            this.colors.forEach((color) => color.unbind());
            this.colors = [];
            newColorValues.forEach((colorValue) => this.addColor(colorValue));
            this.setActiveColor(0);
            this.emit("color:setAll");
        };

        const setActiveColorPicker = (colorIndex) => {
            colorPicker.setActiveColor(colorIndex);
        };

        setActiveColorPicker(0);

        colorPicker.on(["input:end"], () => {
            EventEmitter.dispatch("SET_COLORS", colorPicker.color);
        });

        colorPicker.on(["color:setActive"], () => {
            EventEmitter.dispatch("SET_ACTIVE_COLORS", colorPicker.color);
        });

        colorPicker.setWheelColorType(colors[0].colormode);

        picker.current = colorPicker;

        setActiveColor(colors[0]);

        return () => {
            document.getElementById("colorPicker")?.childNodes.forEach((e) => e.remove());
        };
    }, []);

    // useEffect(() => {
    //     picker.current.setColors(colors.map((color) => color.colorRGB));
    // }, [hue]);

    const handleChangeColorType = () => {
        const index = picker.current.color.index;

        if (type === "xy") {
            const newColorMode = [...colorsMode.slice(0, index), "ct", ...colorsMode.slice(index + 1)];

            setColorsMode(newColorMode);

            picker.current.setColorMode(newColorMode);

            picker.current.setWheelColorType("ct");
            setType("ct");
        } else {
            if (canBeColored.includes(colors[index].modelid)) {
                const newColorMode = [...colorsMode.slice(0, index), "xy", ...colorsMode.slice(index + 1)];

                setColorsMode(newColorMode);

                picker.current.setColorMode(newColorMode);
            }
            picker.current.setWheelColorType("xy");
            setType("xy");
        }
    };

    useEffect(() => {
        EventEmitter.subscribe("SET_COLORS", (newColors) => {
            const light = colors[newColors.index];

            const colorMode = colorsMode[newColors.index];

            if (colorMode === "xy") {
                const {r, g, b} = hexToRgb(newColors.hexString);
                const newXY = rgbToCie(r, g, b);

                editLightState({
                    variables: {
                        bridgeId: light.bridgeId,
                        lightId: light.lightId,
                        state: {xy: newXY, on: true},
                    },
                });

                syncLightPhilipsHue([
                    {
                        bridgeId: light.bridgeId,
                        lightId: light.lightId,
                        state: {xy: {x: newXY[0], y: newXY[1]}, on: true},
                    },
                ]);
            } else {
                const ct = 500 - Math.round(((picker.current.color.kelvin - 2200) / 8800) * 347);

                editLightState({
                    variables: {
                        bridgeId: light.bridgeId,
                        lightId: light.lightId,
                        state: {ct, on: true},
                    },
                });

                syncLightPhilipsHue([
                    {
                        bridgeId: light.bridgeId,
                        lightId: light.lightId,
                        state: {ct, on: true},
                    },
                ]);
            }
        });

        EventEmitter.subscribe("SET_ACTIVE_COLORS", (color) => {
            const light = colors[color.index];

            setType(colorsMode[color.index]);
            picker.current.setWheelColorType(colorsMode[color.index]);
            setActiveColor(light);
            setUpdate(new Date().getTime());
        });

        return () => {
            EventEmitter.remove("SET_COLORS");
            EventEmitter.remove("SET_ACTIVE_COLORS");
        };
        // eslint-disable-next-line
    }, [colors]);

    return (
        <Fragment>
            <div className={classes.iconContainer}>
                <IconButton
                    className={classes.iconButton}
                    style={{backgroundColor: type === "ct" ? "white" : theme.palette.background.light}}
                    onClick={() => handleChangeColorType()}>
                    <Icon>WhiteAmbiance</Icon>
                </IconButton>
            </div>
            <div className={classes.root}>
                <div id="colorPicker"></div>
                {activeColor && (
                    <div className={classes.lightSelector}>
                        <LightSelector hue={hue} device={activeColor} update={update} />
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default withStyles(style)(ColorSelector);

const EDIT_LIGHT = gql`
    mutation editLightState($bridgeId: ID!, $lightId: ID!, $state: PhilipsHueStateInput!) {
        editLightState(bridgeId: $bridgeId, lightId: $lightId, state: $state) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
