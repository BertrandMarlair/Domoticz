import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {useTheme, withStyles} from "@material-ui/core";
import style from "./ActionStyle";
import Icon from "../icon/Icon";
import Card from "../card/Card";
import Text from "../typography/Text";

const Action = ({classes, active, onClick, title, icon, iconColor, children}) => {
    const theme = useTheme();

    const actionClasses = classNames({
        [classes.action]: true,
        [classes.on]: active,
        [classes.off]: !active,
    });

    return (
        <Card className={actionClasses} type={active ? "on" : "off"} onClick={onClick}>
            <div className={classes.actionHeader}>
                <Icon className={classes.actionIcon} size={30} color={active ? iconColor : theme.palette.text.disabled}>
                    {icon}
                </Icon>
                {children}
            </div>
            <div className={classes.actionFooter}>
                <Text className={classes.actionTitle}>{title}</Text>
                <Text className={classes.actionDescription}>{active ? "On" : "Off"}</Text>
            </div>
        </Card>
    );
};

Action.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    active: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(style)(Action);
