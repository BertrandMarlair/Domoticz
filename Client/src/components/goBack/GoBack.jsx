import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./GoBackStyle";
import classNames from "classnames";
import PropTypes from "prop-types";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import {useHistory} from "react-router-dom";

const GoBack = ({classes, className}) => {
    const history = useHistory();

    const buttonClasses = classNames({
        [classes.button]: true,
        [className]: className,
    });

    return (
        <div className={classes.root}>
            <Button className={buttonClasses} color="transparent" onClick={() => history.goBack()}>
                <Icon>Left</Icon>
                Back
            </Button>
        </div>
    );
};

GoBack.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(GoBack);
