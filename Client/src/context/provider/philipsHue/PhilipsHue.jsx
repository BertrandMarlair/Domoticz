/* eslint-disable react/no-unescaped-entities */
import React, {useState} from "react";
import {IconButton, useTheme, withStyles} from "@material-ui/core";
import style from "./PhilipsHueStyle";
import Card from "../../../components/card/Card";
import Icon from "../../../components/icon/Icon";
import Text from "../../../components/typography/Text";
import DeviceList from "./Components/DeviceList";
import AddBridge from "./Components/AddBridge";
import Title from "../../../components/typography/Title";
import {useSelector} from "react-redux";

const PhilipsHue = ({classes}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const philipsHue = useSelector((state) => state.devices.philipsHue);

    console.log(philipsHue);

    return (
        <div className={classes.root}>
            {philipsHue?._id &&
                (philipsHue?.bridges.length === 0 ? (
                    <Card className={classes.addBridge}>
                        <Title bold center>
                            Vous n'avez pas encore de Pont Philips Hue
                        </Title>
                        <Text center className={classes.addBridgeDescription}>
                            Avant de commencer à configurer votre installation, vous devez connecter un bridge philips
                            hue
                        </Text>
                        <img className={classes.bridgeImage} src="/assets/images/bridge.png" alt="bridge" />
                        <IconButton className={classes.addBridgeicon} onClick={() => setOpen(true)}>
                            <Icon color={theme.palette.primary.main} size={50}>
                                Add
                            </Icon>
                        </IconButton>
                    </Card>
                ) : (
                    <DeviceList hue={philipsHue} />
                ))}
            <AddBridge hue={philipsHue} open={open} setOpen={setOpen} />
        </div>
    );
};

export default withStyles(style)(PhilipsHue);
