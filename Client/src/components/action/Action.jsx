import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {useTheme, withStyles} from "@material-ui/core";
import style from "./ActionStyle";
import Icon from "../icon/Icon";
import Card from "../card/Card";
import Text from "../typography/Text";

const Action = ({classes, action, onClick, onLongPress, children}) => {
    const theme = useTheme();

    const actionClasses = classNames({
        [classes.action]: true,
        [classes.on]: action.on,
        [classes.off]: !action.on,
    });

    return (
        <Card className={actionClasses} type={action.on ? "on" : "off"} onClick={onClick} onLongPress={onLongPress}>
            <div className={classes.actionHeader}>
                <Icon
                    className={classes.actionIcon}
                    size={30}
                    color={action.on ? action.iconColor : theme.palette.text.disabled}>
                    {action.icon}
                </Icon>
                {children}
            </div>
            <div className={classes.actionFooter}>
                <Text className={classes.actionTitle}>{action.title}</Text>
                <Text className={classes.actionDescription}>{action.on ? "On" : "Off"}</Text>
            </div>
        </Card>
    );
};

Action.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    action: PropTypes.object,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(style)(Action);
