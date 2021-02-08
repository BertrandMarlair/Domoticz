import React from "react";
import {Grid, makeStyles, withStyles} from "@material-ui/core";
import style from "./SceneSelectorStyle";
import Text from "../../typography/Text";
import {cieToRGB, colorTemperatureToHex, sortColors, getContrasted} from "../../../core/philips/color";
import classNames from "classnames";

const SceneItem = ({classes, scene, targetSceneId, handleTargetScene}) => {
    const getColors = () => {
        if (scene.lightstates) {
            const lights = scene.lightstates.filter((l) => l.on);

            if (lights.length > 1) {
                let colors = [];

                for (let lightIndex in lights) {
                    const light = lights[lightIndex];

                    if (light?.xy?.x) {
                        colors.push(cieToRGB(light.xy.x, light.xy.y));
                    } else if (light.ct) {
                        colors.push(colorTemperatureToHex(light.ct));
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

                if (light?.xy?.x) {
                    const color = cieToRGB(light.xy.x, light.xy.y);

                    return {
                        background: color,
                        color: getContrasted(color),
                    };
                } else if (light?.ct) {
                    const color = colorTemperatureToHex(light.ct);

                    return {
                        background: color,
                        color: getContrasted(color),
                    };
                }
            }
        } else if (device?.xy?.x) {
            const color = cieToRGB(device.xy.x, device.xy.y);

            return {
                background: color,
                color: getContrasted(color),
            };
        } else if (device?.ct) {
            const color = colorTemperatureToHex(device.ct);

            return {
                background: color,
                color: getContrasted(color),
            };
        }
    };

    const getState = scene.sceneId === targetSceneId;
    const lightsColor = getColors();

    const useStyles = makeStyles({
        scene: {
            "&:before": {
                background: lightsColor?.background,
                opacity: getState ? 1 : 0.4,
            },
        },
    });

    const sceneClasses = useStyles();

    const containerClasses = classNames({
        [classes.scene]: true,
        [sceneClasses.scene]: true,
    });

    return (
        <Grid item xs={6}>
            <div className={containerClasses} onClick={() => handleTargetScene(scene.sceneId)}>
                <Text style={{color: getState && lightsColor?.color, zIndex: 1}}>{scene.name}</Text>
            </div>
        </Grid>
    );
};

export default withStyles(style)(SceneItem);
