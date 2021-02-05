import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./CardStyle";
import classNames from "classnames";
import PropTypes from "prop-types";

const Card = ({classes, className, children, noPadding, noMargin, width, onClick, type, style: customStyle}) => {
    const cardClasses = classNames({
        [classes.root]: true,
        [className]: className,
        [classes.noMargin]: noMargin,
        [classes.noPadding]: noPadding,
        [classes[type]]: type,
    });

    return (
        <div className={cardClasses} style={{width, ...customStyle}} onClick={onClick}>
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
