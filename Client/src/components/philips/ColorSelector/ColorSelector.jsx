/* eslint-disable no-unused-vars */
import React, {useEffect, useRef, useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./ColorSelectorStyle";
import iro from "@jaames/iro";
import {EventEmitter} from "../../../core/events/events";
import {cieToRGB, colorTemperatureToHex, hexToRgb, rgbToCie} from "../../../core/philips/color";
import Pointer from "./Pointer";
import {useDispatch} from "react-redux";
import {EDIT_LIGHT_STATE, SYNC_DEVICE} from "../../../core/reducers/devicesConfig";
import {useMutation} from "react-apollo";
import gql from "graphql-tag";
import {philipsHueFragment} from "../../../app/SyncDevices";
import LightSelector from "../LightSelector/LightSelector";

const ColorSelector = ({classes, hue, device}) => {
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
                        ...light,
                    });
                }
            }
        }

        return colorList;
    };

    const colors = getColors();

    useEffect(() => {
        let colorPicker = new iro.ColorPicker("#colorPicker", {
            width: 280,
            colors: colors.map((color) => color.colorRGB),
            wheelAngle: 120,
            handleRadius: 25,
            borderColor: "#fff",
            handleSvg: "#handle",
            layout: [
                {
                    component: iro.ui.Wheel,
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

        picker.current = colorPicker;

        setActiveColor(colors[0]);

        return () => {
            document.getElementById("colorPicker")?.childNodes.forEach((e) => e.remove());
        };
    }, []);

    useEffect(() => {
        picker.current.setColors(colors.map((color) => color.colorRGB));
    }, [hue]);

    useEffect(() => {
        EventEmitter.subscribe("SET_COLORS", (newColors) => {
            const light = colors[newColors.index];
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
        });

        EventEmitter.subscribe("SET_ACTIVE_COLORS", (color) => {
            const light = colors[color.index];

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
        <div className={classes.root}>
            <Pointer />
            <div id="colorPicker"></div>
            {activeColor && (
                <div className={classes.lightSelector}>
                    <LightSelector hue={hue} device={activeColor} update={update} />
                </div>
            )}
        </div>
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
