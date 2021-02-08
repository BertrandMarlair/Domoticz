import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./CardStyle";
import classNames from "classnames";
import PropTypes from "prop-types";
import useLongPress from "../../core/hooks/useLongPress";

const Card = ({
    classes,
    className,
    children,
    noPadding,
    noMargin,
    width,
    onClick,
    onLongPress,
    type,
    style: customStyle,
}) => {
    const longPressEvent = useLongPress(onLongPress, onClick);

    const cardClasses = classNames({
        [classes.root]: true,
        [className]: className,
        [classes.noMargin]: noMargin,
        [classes.noPadding]: noPadding,
        [classes[type]]: type,
    });

    return (
        <div className={cardClasses} style={{width, ...customStyle}} {...longPressEvent}>
            {children}
        </div>
    );
};

Card.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    noPadding: PropTypes.bool,
    noMargin: PropTypes.bool,
    width: PropTypes.number,
    style: PropTypes.object,
    type: PropTypes.oneOf(["on", "off"]),
};

export default withStyles(style)(Card);
