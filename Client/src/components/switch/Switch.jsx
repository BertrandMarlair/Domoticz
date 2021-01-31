import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SwitchButton from "@material-ui/core/Switch";
import {withStyles} from "@material-ui/core";
import style from "./SwitchStyle";

const Switch = (props) => {
    const {classes, checked, onChange, label} = props;

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <SwitchButton
                        disableRipple
                        classes={{
                            root: classes.root,
                            switchBase: classes.switchBase,
                            thumb: classes.thumb,
                            track: classes.track,
                            checked: classes.checked,
                        }}
                        checked={checked}
                        onChange={onChange}
                        {...props}
                    />
                }
                label={label}
            />
        </FormGroup>
    );
};

export default withStyles(style)(Switch);
