/* eslint-disable no-unused-vars */
import React, {Fragment, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import useEventListener from "../../../core/hooks/useEventListener";
import {SLIDER_EVENT} from "../../../core/constants";
import classNames from "classnames";

const height = "100%";
const width = 22;

const iOSBoxShadow = "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const CustomizedSlider = ({opened, lightsColor, isChanging, setIsChanging, value, handleChange, handleEndChange}) => {
    const useStylesSlider = makeStyles(() => ({
        root: {
            height: "100%",
            color: "transparent",
            width: `calc(100% - ${width}px)`,
            marginLeft: width,
            position: "relative",
            padding: 0,
        },
        thumb: {
            height,
            width: width,
            borderRadius: 11,
            backgroundColor: "#fff",
            boxShadow: iOSBoxShadow,
            marginTop: 0,
            marginLeft: `-${width}px`,
            transition: !isChanging ? "1s" : "0",
            zIndex: 3,
            "&:focus, &:hover, &$active": {
                boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
                "@media (hover: none)": {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        active: {},
        track: {
            height,
            borderRadius: 11,
            marginLeft: `-${width}px`,
            transition: !isChanging ? "1s" : "0",
            "&:before": {
                width: `calc(100% + ${width}px)`,
                backgroundImage: "linear-gradient(90deg, #5f5f5f1a 0%, #ffffff 95%)",
                content: "''",
                display: "block",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "opacity 0.3s",
                borderRadius: 10,
                zIndex: 1,
            },
        },
        rail: {
            height,
            backgroundColor: "#25252554",
            zIndex: 0,
            borderRadius: 11,
            width: `calc(100% + ${width}px)`,
            marginLeft: `-${width}px`,
        },
    }));

    const useStyles = makeStyles(() => ({
        rootWrapper: {
            width: "100%",
            height: 22,
            position: "absolute",
            display: "flex",
            alignItems: "flex-end",
            bottom: 0,
            transition: "0.2s",
            backgroundImage: lightsColor,
            borderRadius: 11,
        },
        spacer: {
            transition: "0.2s",
        },
    }));

    const classesSlider = useStylesSlider();
    const classes = useStyles();

    const [startingValue, setStartingValue] = useState(value < 1 ? 1 : value);

    const handleSlide = (event, newValue) => {
        if (!isChanging) {
            setIsChanging(true);
            setStartingValue(value);
            handleChange(newValue, value);
        } else {
            handleChange(newValue, startingValue);
        }
    };

    const onMouseUp = () => {
        if (isChanging) {
            setIsChanging(false);
            handleEndChange(value, startingValue);
            setStartingValue(value);
        }
    };

    useEventListener(SLIDER_EVENT.UP, onMouseUp);

    const containerClasses = classNames({
        [classes.rootWrapper]: true,
        [classes.rootAboslute]: isChanging,
    });

    const sliderHeight = isChanging ? "100%" : 22;

    return (
        <Fragment>
            <div
                className={containerClasses}
                style={{height: sliderHeight, opacity: opened ? 1 : 0, pointerEvents: opened ? "all" : "none"}}>
                <Slider
                    classes={classesSlider}
                    aria-label="ios slider"
                    defaultValue={60}
                    onChange={handleSlide}
                    value={value}
                    min={1}
                    max={100}
                />
            </div>
            <div className={classes.spacer} style={{height: opened ? 22 : 0}} />
        </Fragment>
    );
};

export default CustomizedSlider;
