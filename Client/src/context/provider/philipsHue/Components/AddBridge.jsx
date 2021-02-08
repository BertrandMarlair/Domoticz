/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {Step, StepLabel, Stepper, useTheme, withStyles} from "@material-ui/core";
import style from "./style";
import gql from "graphql-tag";
import Text from "../../../../components/typography/Text";
import Title from "../../../../components/typography/Title";
import Icon from "../../../../components/icon/Icon";
import Modal from "../../../../components/modal/SimpleModal";
import Button from "../../../../components/button/Button";
import Input from "../../../../components/input/Input";
import SmallTitle from "../../../../components/typography/SmallTitle";
import {validateIPAddress} from "../../../../core/utils/misc";
import {useLazyQuery} from "react-apollo";
import Error from "../../../../components/error/Error";
import Loading from "../../../../components/loading/Loading";
import fetchMoreGQL from "../../../../core/utils/fetchMore";

const getSteps = () => {
    return ["Entrer l'adresse IP du bridge", "Connection au pont", "Enjoy !"];
};

const AddBridge = ({classes, open, setOpen, fetchMore}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [bridge, setBridge] = useState(null);
    const [ipAddress, setIPAddress] = useState("");
    const [connectionError, setConnectionError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [tryToRegisterInterval, setTryToRegisterInterval] = useState(null);
    const steps = getSteps();

    const [hueBridgeConnection, hueBridgeConnectionData] = useLazyQuery(HUE_BRIDGE_CONNECTION);
    const [hueBridgeRegister, hueBridgeRegisterData] = useLazyQuery(HUE_BRIDGE_REGISTER, {
        refetchQueries: ["getPhilipsHueDevices"],
    });

    useEffect(() => {
        setConnectionError("");
        if (hueBridgeConnectionData?.data?.hueBridgeAddConnection) {
            if (hueBridgeConnectionData.data.hueBridgeAddConnection.ok) {
                setActiveStep(1);
                setBridge(hueBridgeConnectionData.data.hueBridgeAddConnection);
            } else {
                setConnectionError("La connection n'a pas pu être établie. Vérifiez que vous êtes sur le bon réseau");
            }
        }
        if (hueBridgeConnectionData?.error) {
            setConnectionError(hueBridgeConnectionData?.error?.message);
        }
    }, [hueBridgeConnectionData]);

    useEffect(() => {
        setRegisterError("");
        if (hueBridgeRegisterData?.data?.hueBridgeRegister) {
            if (hueBridgeRegisterData.data.hueBridgeRegister.ok) {
                setActiveStep(2);
                setLoadingRegister(false);
                clearInterval(tryToRegisterInterval);
                setTryToRegisterInterval(null);
                if (fetchMore) {
                    fetchMoreGQL(fetchMore);
                }
            }
        }
        if (hueBridgeRegisterData?.error) {
            setRegisterError(hueBridgeRegisterData.error);
            setLoadingRegister(false);
            clearInterval(tryToRegisterInterval);
            setTryToRegisterInterval(null);
        }
    }, [hueBridgeRegisterData]);

    const handleConnectToBridge = (address) => {
        hueBridgeConnection({variables: {ipAddress: address}});
    };

    const tryConnectToBridge = () => {
        setRegisterError("");
        hueBridgeRegister({variables: {ipAddress, name: bridge?.bridgeId}});
        setLoadingRegister(true);
        const tryToRegister = setInterval(() => {
            hueBridgeRegister({variables: {ipAddress, name: bridge?.bridgeId}});
        }, 5000);

        setTryToRegisterInterval(tryToRegister);
    };

    useEffect(() => {
        if (activeStep === 1) {
            tryConnectToBridge();
        } else if (tryToRegisterInterval) {
            clearInterval(tryToRegisterInterval);
            setTryToRegisterInterval(null);
        }

        return () => {
            clearInterval(tryToRegisterInterval);
            setTryToRegisterInterval(null);
        };
    }, [activeStep]);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div className={classes.stepContent}>
                        <SmallTitle className={classes.stepTitle}>Entrez l'adresse IP du pont</SmallTitle>
                        <Text className={classes.stepDescription}>
                            Vous pourrez la trouver grace à un scanner de réseaux comme Fing
                        </Text>
                        <Input
                            autoFocus
                            value={ipAddress}
                            onChange={(e) => setIPAddress(e.target.value)}
                            placeholder={"Adresse IP du pont"}
                        />
                        <Error errorMessage={connectionError} />
                        <Button
                            onClick={() => handleConnectToBridge(ipAddress)}
                            disabled={!validateIPAddress(ipAddress)}
                            loading={hueBridgeConnectionData?.loading}>
                            Tester la connection au pont
                        </Button>
                    </div>
                );
            case 1:
                return (
                    <div className={classes.stepContent}>
                        <Title bold center className={classes.stepTitle}>
                            Appuyer sur le bouton central
                        </Title>
                        <Text center className={classes.stepDescription}>
                            Appuyer sur le bouton central du pont pour autoriser sa connection
                        </Text>
                        <img className={classes.bridgeImage} src="/assets/images/bridgeClick.png" alt="bridgeClick" />
                        {loadingRegister && <Loading smallCircular />}
                        <Error className={classes.errorMessage} errorMessage={registerError} />
                        {registerError && <Button onClick={() => tryConnectToBridge(1)}>Essayer à nouveau</Button>}
                        <div className={classes.buttonWrapper}>
                            <Button onClick={() => setActiveStep(0)} className={classes.button}>
                                Back
                            </Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={classes.stepContent}>
                        <Title bold center className={classes.stepTitle}>
                            Vous avez ajouté votre pont à Domoticz
                        </Title>
                        <Text center className={classes.stepDescription}>
                            Vous pourrez dès à présent configurer l'essemble de vos lampes et pièces !
                        </Text>
                        <Icon className={classes.iconWrapper} color={theme.palette.primary.main} size={50}>
                            Checked
                        </Icon>
                        <Button className={classes.closeButtonWrapper} fullWidth onClick={() => setOpen(false)}>
                            Fermer
                        </Button>
                    </div>
                );
        }
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)} maxWidth="xl" title="Ajouter un nouveau pont">
            <div className={classes.modalWrapper}>
                <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        </Modal>
    );
};

export default withStyles(style)(AddBridge);

const HUE_BRIDGE_CONNECTION = gql`
    query hueBridgeAddConnection($ipAddress: String!) {
        hueBridgeAddConnection(ipAddress: $ipAddress) {
            ok
            bridgeId
        }
    }
`;

const HUE_BRIDGE_REGISTER = gql`
    query hueBridgeRegister($ipAddress: String!, $name: String!) {
        hueBridgeRegister(ipAddress: $ipAddress, name: $name) {
            ok
            error
        }
    }
`;
