/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {IconButton, useTheme, withStyles} from "@material-ui/core";
import style from "./PhilipsHueStyle";
import gql from "graphql-tag";
import Card from "../../../components/card/Card";
import Icon from "../../../components/icon/Icon";
import SmallTitle from "../../../components/typography/SmallTitle";
import Text from "../../../components/typography/Text";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import DeviceList from "./Components/DeviceList";
import AddBridge from "./Components/AddBridge";
import Title from "../../../components/typography/Title";

const PhilipsHue = ({classes}) => {
    const theme = useTheme();
    const [hue, setHue] = useState({});
    const [open, setOpen] = useState(false);

    const {data, loading, error, fetchMore} = useQuery(GET_PHILIPS_HUE_DEVICES);

    useEffect(() => {
        if (data?.getPhilipsHueDevices) {
            setHue(data.getPhilipsHueDevices);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <Card className={classes.addProvider}>
                <div className={classes.addProviderHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addProviderIcon}>
                        Light
                    </Icon>
                    <div>
                        <SmallTitle className={classes.addProviderTitle}>Philips Hue</SmallTitle>
                        <Text className={classes.addProviderText} color="lightGrey">
                            Le provider est le point central d'un produit domotique pour la maison.
                        </Text>
                    </div>
                </div>
            </Card>
            {loading ? (
                <Loading absolute />
            ) : (
                hue?._id &&
                (hue?.bridges.length === 0 ? (
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
                    <DeviceList hue={hue} />
                ))
            )}
            <AddBridge hue={hue} open={open} setOpen={setOpen} fetchMore={fetchMore} />
        </div>
    );
};

export default withStyles(style)(PhilipsHue);

const GET_PHILIPS_HUE_DEVICES = gql`
    query getPhilipsHueDevices {
        getPhilipsHueDevices {
            _id
            title
            description
            bridges {
                _id
                providerId
                ipAddress
                token
                name
            }
        }
    }
`;
