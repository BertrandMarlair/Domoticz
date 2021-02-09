/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import {Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueLightStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";
import Text from "../../../../../components/typography/Text";
import Modal from "../../../../../components/modal/SimpleModal";
import Input from "../../../../../components/input/Input";
import {useMutation} from "react-apollo";
import {SYNC_DEVICE} from "../../../../../core/reducers/devicesConfig";
import notify from "../../../../../core/snackbar/snackbar";
import {philipsHueFragment} from "../../../../../app/SyncDevices";

const PhilipsHueLight = ({classes}) => {
    const dispatch = useDispatch();
    const philipsHue = useSelector((state) => state.devices.philipsHue);
    const [lightToEdit, setLightToEdit] = useState(null);
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);

    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const [editLightName, editLightNameData] = useMutation(EDIT_LIGHT_NAME);
    const [deleteLight, deleteLightData] = useMutation(DELETE_LIGHT);

    useEffect(() => {
        if (editLightNameData?.data?.editLightName) {
            syncPhilipsHue({...editLightNameData?.data?.editLightName, force: true});
            setLightToEdit(null);
        }
        if (editLightNameData?.error) {
            notify(editLightNameData.error.message, {
                variant: "error",
            });
        }
    }, [editLightNameData]);

    useEffect(() => {
        if (deleteLightData?.data?.deleteLight) {
            syncPhilipsHue({...deleteLightData?.data?.deleteLight, force: true});
            setLightToEdit(null);
        }
        if (deleteLightData?.error) {
            notify(deleteLightData.error.message, {
                variant: "error",
            });
        }
    }, [deleteLightData]);

    const getLight = () => {
        let light = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let bridge of philipsHue.bridges) {
                if (bridge?.lights) {
                    light = [...light, ...bridge.lights];
                }
            }
        }

        return light;
    };

    const handleClose = () => {
        setLightToEdit(null);
        setName("");
        setErrorName(null);
    };

    const handleEditLight = (light) => {
        setLightToEdit(light);
        setName(light.name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validation = true;

        if (name?.length < 4) {
            setErrorName("Le nom du pont est trop court");
            validation = false;
        }

        if (validation) {
            editLightName({
                variables: {
                    bridgeId: lightToEdit?.bridgeId,
                    lightId: lightToEdit?.lightId,
                    name,
                },
            });
        }
    };

    const handleDeleteBridge = () => {
        // eslint-disable-next-line no-alert
        window.confirm("Voulez vous vraiment surprimer cette light ?");

        deleteBridge({
            variables: {
                bridgeId: bridgeToEdit?.bridgeId,
                lightId: lightToEdit?.lightId,
            },
        });
    };

    return (
        <div className={classes.root}>
            <GoBack />
            <Title className={classes.title} bold>
                Configuration de la lumière
            </Title>
            <Grid container>
                {getLight().map((light, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`light/${index}`}>
                            <Card className={classes.light}>
                                <Icon size={40} className={classes.lightIcon}>
                                    {light.productname}
                                </Icon>
                                <Text>{light?.state?.on ? "ON" : "OFF"}</Text>
                                <SmallTitle className={classes.lightTitle}>{light.name}</SmallTitle>
                                <Button onClick={() => handleEditLight(light)} fullWidth>
                                    Configurer
                                </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Modal open={!!lightToEdit} onClose={() => handleClose()} title="Light Hue">
                <div>
                    <form className={classes.lightFromWrapper} onSubmit={(e) => handleSubmit(e)}>
                        <SmallTitle color="label" className={classes.label}>
                            Nom de la Light
                        </SmallTitle>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom du light hue"
                            error={!!errorName}
                        />
                        <Button round size="sm" type="submit">
                            Sauvegarder
                        </Button>
                    </form>
                    <div className={classes.lightParamWrapper}>
                        <div className={classes.lightParam}>
                            <SmallTitle className={classes.lightParamTitle}>Produit: </SmallTitle>
                            <Text className={classes.lightParamValue}>{lightToEdit?.productname}</Text>
                        </div>
                        <div className={classes.lightParam}>
                            <SmallTitle className={classes.lightParamTitle}>Fabriquant: </SmallTitle>
                            <Text className={classes.lightParamValue}>{lightToEdit?.manufacturername}</Text>
                        </div>
                        <div className={classes.lightParam}>
                            <SmallTitle className={classes.lightParamTitle}>Modele: </SmallTitle>
                            <Text className={classes.lightParamValue}>{lightToEdit?.modelid}</Text>
                        </div>
                    </div>
                    <div className={classes.lightFooter}>
                        <Button color="error" round size="sm" onClick={() => handleDeleteBridge()}>
                            Effacer
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default withStyles(style)(PhilipsHueLight);

const EDIT_LIGHT_NAME = gql`
    mutation editLightName($bridgeId: ID!, $lightId: ID!, $name: String!) {
        editLightName(bridgeId: $bridgeId, lightId: $lightId, name: $name) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;

const DELETE_LIGHT = gql`
    mutation deleteLight($bridgeId: ID!, $lightId: ID!) {
        deleteLight(bridgeId: $bridgeId, lightId: $lightId) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
