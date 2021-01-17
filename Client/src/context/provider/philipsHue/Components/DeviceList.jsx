/* eslint-disable react/no-unescaped-entities */
import React from "react";
import style from "./style";
import {IconButton, withStyles} from "@material-ui/core";
import Card from "../../../../components/card/Card";
import Icon from "../../../../components/icon/Icon";
import Text from "../../../../components/typography/Text";
import Title from "../../../../components/typography/Title";
import GoBack from "../../../../components/goBack/GoBack";
import SmallTitle from "../../../../components/typography/SmallTitle";
import {useHistory} from "react-router-dom";

const DeviceList = ({classes, hue}) => {
    const history = useHistory();

    const getRoomCount = () => {
        let count = 0;

        if (hue?.bridges?.length > 0) {
            for (let bridge of hue.bridges) {
                count = +bridge?.groups?.length ?? 0;
            }
        }

        return count;
    };

    const getLightCount = () => {
        let count = 0;

        if (hue?.bridges?.length > 0) {
            for (let bridge of hue.bridges) {
                count = +bridge?.lights?.length ?? 0;
            }
        }

        return count;
    };

    return (
        <div className={classes.root}>
            <GoBack />
            <Title className={classes.title} bold>
                Gestion des appareils Philips Hue
            </Title>
            <Card className={classes.device} onClick={() => history.push("/provider/philips_hue/bridge")}>
                <div className={classes.deviceHeader}>
                    <Icon size={50} className={classes.deviceIcon}>
                        Bridge
                    </Icon>
                    <div>
                        <SmallTitle className={classes.deviceTitle}>Philips Hue</SmallTitle>
                        <Text className={classes.deviceText} color="lightGrey">
                            Le bridge est le point central d'une installation philips hue.
                        </Text>
                    </div>
                    <div className={classes.deviceEnd}>
                        {hue?._id ? (
                            <SmallTitle className={classes.statusText} color="success">
                                Connecté
                            </SmallTitle>
                        ) : (
                            <SmallTitle className={classes.statusText} color="error">
                                Fail
                            </SmallTitle>
                        )}
                        <IconButton className={classes.deviceIcon}>
                            <Icon>Right</Icon>
                        </IconButton>
                    </div>
                </div>
            </Card>
            <Card className={classes.device} onClick={() => history.push("/provider/philips_hue/room")}>
                <div className={classes.deviceHeader}>
                    <Icon size={40} className={classes.deviceIcon}>
                        Door
                    </Icon>
                    <div>
                        <SmallTitle className={classes.deviceTitle}>Pièces et zones</SmallTitle>
                        <Text className={classes.deviceText} color="lightGrey">
                            Agencez votre habitation et attribuez des lampes
                        </Text>
                    </div>
                    <div className={classes.deviceEnd}>
                        <Text>( {getRoomCount()} )</Text>
                        <IconButton className={classes.deviceIcon}>
                            <Icon>Right</Icon>
                        </IconButton>
                    </div>
                </div>
            </Card>
            <Card className={classes.device} onClick={() => history.push("/provider/philips_hue/light")}>
                <div className={classes.deviceHeader}>
                    <Icon size={50} className={classes.deviceIcon}>
                        Lamp
                    </Icon>
                    <div>
                        <SmallTitle className={classes.deviceTitle}>Configuration de la lumière</SmallTitle>
                        <Text className={classes.deviceText} color="lightGrey">
                            Ajoutez de nouvelles lumières ou modifiez les noms
                        </Text>
                    </div>
                    <div className={classes.deviceEnd}>
                        <Text>( {getLightCount()} )</Text>
                        <IconButton className={classes.deviceIcon}>
                            <Icon>Right</Icon>
                        </IconButton>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(DeviceList);
