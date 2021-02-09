/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import {Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueBridgeStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import Text from "../../../../../components/typography/Text";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {philipsHueFragment} from "../../../../../app/SyncDevices";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";
import Modal from "../../../../../components/modal/SimpleModal";
import AddBridge from "../../Components/AddBridge";
import Input from "../../../../../components/input/Input";
import {useMutation} from "react-apollo";
import {SYNC_DEVICE} from "../../../../../core/reducers/devicesConfig";
import notify from "../../../../../core/snackbar/snackbar";

const PhilipsHueBridge = ({classes}) => {
    const dispatch = useDispatch();
    const philipsHue = useSelector((state) => state.devices.philipsHue);
    const [open, setOpen] = useState(false);
    const [bridgeToEdit, setBridgeToEdit] = useState(null);
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);

    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const [editBridgeName, editBridgeNameData] = useMutation(EDIT_BRIDGE_NAME);
    const [deleteBridge, deleteBridgeData] = useMutation(DELETE_BRIDGE);

    useEffect(() => {
        if (editBridgeNameData?.data?.editBridgeName) {
            syncPhilipsHue({...editBridgeNameData?.data?.editBridgeName, force: true});
            setBridgeToEdit(null);
        }
        if (editBridgeNameData?.error) {
            notify(editBridgeNameData.error.message, {
                variant: "error",
            });
        }
    }, [editBridgeNameData]);

    useEffect(() => {
        if (deleteBridgeData?.data?.deleteBridge) {
            syncPhilipsHue({...deleteBridgeData?.data?.deleteBridge, force: true});
            setBridgeToEdit(null);
        }
        if (deleteBridgeData?.error) {
            notify(deleteBridgeData.error.message, {
                variant: "error",
            });
        }
    }, [deleteBridgeData]);

    const getBridges = () => {
        let bridges = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let hueBridge of philipsHue.bridges) {
                if (hueBridge?.config) {
                    bridges = [...bridges, hueBridge];
                }
            }
        }

        return bridges;
    };

    const handleEditBridge = (bridge) => {
        setBridgeToEdit(bridge);
        setName(bridge.name);
    };

    const handleClose = () => {
        setBridgeToEdit(null);
        setName("");
        setErrorName(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validation = true;

        if (name?.length < 4) {
            setErrorName("Le nom du pont est trop court");
            validation = false;
        }

        if (validation) {
            editBridgeName({
                variables: {
                    bridgeId: bridgeToEdit?._id,
                    name,
                },
            });
        }
    };

    const handleDeleteBridge = () => {
        // eslint-disable-next-line no-alert
        window.confirm("Voulez vous vraiment surprimer ce pont ?");

        deleteBridge({
            variables: {
                bridgeId: bridgeToEdit?._id,
            },
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <GoBack />
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Ajouter un nouveau bridge
                </Button>
            </div>
            <Title className={classes.title} bold loading={editBridgeNameData?.loading}>
                Configuration des bridges
            </Title>
            <Grid container>
                {getBridges().map((bridge, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`bridge/${index}`}>
                            <Card className={classes.bridge}>
                                <Icon size={60} className={classes.bridgeIcon}>
                                    Bridge
                                </Icon>
                                <SmallTitle center className={classes.bridgeTitle}>
                                    {bridge?.name}
                                </SmallTitle>
                                <Text center className={classes.bridgeTitle}>
                                    {bridge.ipAddress}
                                </Text>
                                <Button onClick={() => handleEditBridge(bridge)} fullWidth>
                                    Configurer
                                </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <AddBridge hue={philipsHue} open={open} setOpen={setOpen} />
            <Modal open={!!bridgeToEdit} onClose={() => handleClose()} title="Bridge Hue">
                <div>
                    <form className={classes.bridgeFromWrapper} onSubmit={(e) => handleSubmit(e)}>
                        <SmallTitle color="label" className={classes.label}>
                            Nom du Bridge Hue
                        </SmallTitle>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom du bridge hue"
                            error={!!errorName}
                        />
                        <Button round size="sm" type="submit">
                            Sauvegarder
                        </Button>
                    </form>
                    <div className={classes.bridgeParamWrapper}>
                        <div className={classes.bridgeParam}>
                            <SmallTitle className={classes.bridgeParamTitle}>Bridge Id: </SmallTitle>
                            <Text className={classes.bridgeParamValue}>{bridgeToEdit?.config?.bridgeid}</Text>
                        </div>
                        <div className={classes.bridgeParam}>
                            <SmallTitle className={classes.bridgeParamTitle}>Data Store Version: </SmallTitle>
                            <Text className={classes.bridgeParamValue}>{bridgeToEdit?.config?.datastoreversion}</Text>
                        </div>
                        <div className={classes.bridgeParam}>
                            <SmallTitle className={classes.bridgeParamTitle}>Mac: </SmallTitle>
                            <Text className={classes.bridgeParamValue}>{bridgeToEdit?.config?.mac}</Text>
                        </div>
                        <div className={classes.bridgeParam}>
                            <SmallTitle className={classes.bridgeParamTitle}>Model Id: </SmallTitle>
                            <Text className={classes.bridgeParamValue}>{bridgeToEdit?.config?.modelid}</Text>
                        </div>
                        <div className={classes.bridgeParam}>
                            <SmallTitle className={classes.bridgeParamTitle}>SW Version: </SmallTitle>
                            <Text className={classes.bridgeParamValue}>{bridgeToEdit?.config?.swversion}</Text>
                        </div>
                    </div>
                    <div className={classes.bridgeFooter}>
                        <Text>
                            En supprimant ce Hue Pont vous ne pourrez plus contrôler vis lumières ni configurer
                            d'accessoires par le biais de cette application mais vous pourrez continuer à utiliser dans
                            l'application Philips Hue
                        </Text>
                        <Button color="error" round size="sm" onClick={() => handleDeleteBridge()}>
                            Effacer
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default withStyles(style)(PhilipsHueBridge);

const EDIT_BRIDGE_NAME = gql`
    mutation editBridgeName($bridgeId: ID!, $name: String!) {
        editBridgeName(bridgeId: $bridgeId, name: $name) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;

const DELETE_BRIDGE = gql`
    mutation deleteBridge($bridgeId: ID!) {
        deleteBridge(bridgeId: $bridgeId) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
