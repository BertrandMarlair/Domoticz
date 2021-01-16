/* eslint-disable */
/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from "react";
import style from "./style";
import gql from "graphql-tag";
import {useLazyQuery} from "react-apollo";
import {IconButton, withStyles} from "@material-ui/core";
import Card from "../../../../components/card/Card";
import Icon from "../../../../components/icon/Icon";
import Error from "../../../../components/error/Error";
import Text from "../../../../components/typography/Text";
import Title from "../../../../components/typography/Title";
import Loading from "../../../../components/loading/Loading";
import SmallTitle from "../../../../components/typography/SmallTitle";
import {useHistory} from "react-router-dom";

const DeviceList = ({classes, hue}) => {
    const [connectionIssueBride, setConnectionIssueBride] = useState(false);
    const [connectionSuccessBride, setConnectionSuccessBride] = useState(false);
    const [hueBridgeConnection, hueBridgeConnectionData] = useLazyQuery(HUE_BRIDGE_CONNECTION);

    const history = useHistory()

    useEffect(() => {
        if (hue?.bridges?.length > 0) {
            for (let bridge of hue.bridges) {
                hueBridgeConnection({variables: {ipAddress: bridge.ipAddress}})
            }
        }
    }, [hue]);

    useEffect(() => {
        if (hueBridgeConnectionData?.data?.hueBridgeConnection) {
            const bridge = hueBridgeConnectionData.data.hueBridgeConnection;
            console.log(bridge);
            if (bridge.ok) {
                setConnectionSuccessBride(true);
            } else {
                setConnectionIssueBride(true);
                setConnectionSuccessBride(false);
            }
        }
    }, [hueBridgeConnectionData]);

    return (
        <div className={classes.root}>
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
                        {connectionIssueBride && <Error className={classes.statusText} errorMessage={"Connection issue"} />}
                    </div>
                    <div className={classes.deviceEnd}>
                        {hueBridgeConnectionData?.loading && <Loading smallCircular />}
                        {connectionSuccessBride && <SmallTitle className={classes.statusText} color="success">Connecté</SmallTitle>}
                        <IconButton className={classes.deviceIcon}><Icon>Right</Icon></IconButton>
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
                        <IconButton className={classes.deviceIcon}><Icon>Right</Icon></IconButton>
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
                        <IconButton className={classes.deviceIcon}><Icon>Right</Icon></IconButton>
                    </div>
                </div>
            </Card>
            <Card className={classes.device} onClick={() => history.push("/provider/philips_hue/sensor")}>
                <div className={classes.deviceHeader}>
                    <Icon size={50} className={classes.deviceIcon}>
                        Dimmer
                    </Icon>
                    <div>
                        <SmallTitle className={classes.deviceTitle}>Configuration de la lumière</SmallTitle>
                        <Text className={classes.deviceText} color="lightGrey">
                            Configurer des capteurs et intérrupteurs
                        </Text>
                    </div>
                    <div className={classes.deviceEnd}>
                        <IconButton className={classes.deviceIcon}><Icon>Right</Icon></IconButton>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default withStyles(style)(DeviceList);

const HUE_BRIDGE_CONNECTION = gql`
    query hueBridgeConnection($ipAddress: String!) {
        hueBridgeConnection(ipAddress: $ipAddress) {
            ok
            bridgeId
        }
    }
`;
