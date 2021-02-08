/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import gql from "graphql-tag";
import {Checkbox, Grid, withStyles} from "@material-ui/core";
import style from "./PhilipsHueRoomStyle";
import Card from "../../../../../components/card/Card";
import Icon from "../../../../../components/icon/Icon";
import Title from "../../../../../components/typography/Title";
import SmallTitle from "../../../../../components/typography/SmallTitle";
import GoBack from "../../../../../components/goBack/GoBack";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../../../components/button/Button";
import Text from "../../../../../components/typography/Text";
import Input from "../../../../../components/input/Input";
import {useMutation} from "react-apollo";
import {philipsHueFragment} from "../../../../../app/SyncDevices";
import {SYNC_DEVICE} from "../../../../../core/reducers/devicesConfig";
import Modal from "../../../../../components/modal/SimpleModal";
import Select from "../../../../../components/select/Select";
import notify from "../../../../../core/snackbar/snackbar";

const PhilipsHueRoom = ({classes}) => {
    const dispatch = useDispatch();
    const philipsHue = useSelector((state) => state.devices.philipsHue);
    const [roomToEdit, setRoomToEdit] = useState(null);
    const [name, setName] = useState("");
    const [errorName, setErrorName] = useState(null);
    const [className, setClassName] = useState("");
    const [errorClassName, setErrorClassName] = useState(null);
    const [errorBridge, setErrorBridge] = useState(null);
    const [selectedLights, setSelectedLights] = useState([]);
    const [selectedBridge, setSelectedBridge] = useState(null);

    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const [editGroupConfig, editGroupConfigData] = useMutation(EDIT_GROUP_CONFIG);
    const [addGroup, addGroupData] = useMutation(ADD_GROUP);
    const [deleteGroup, deleteGroupData] = useMutation(DELETE_GROUP);

    const options = [
        {
            value: "Home",
            label: "Maison",
        },
        {
            value: "Bedroom",
            label: "Chambre",
        },
        {
            value: "Office",
            label: "Bureau",
        },
    ];

    useEffect(() => {
        if (editGroupConfigData?.data?.editGroupConfig) {
            syncPhilipsHue({...editGroupConfigData?.data?.editGroupConfig, force: true});
            setRoomToEdit(null);
        }
        if (editGroupConfigData?.error) {
            notify(editGroupConfigData.error.message, {
                variant: "error",
            });
        }
    }, [editGroupConfigData]);

    useEffect(() => {
        if (addGroupData?.data?.addGroup) {
            syncPhilipsHue({...addGroupData?.data?.addGroup, force: true});
            setRoomToEdit(null);
        }
        if (addGroupData?.error) {
            notify(addGroupData.error.message, {
                variant: "error",
            });
        }
    }, [addGroupData]);

    useEffect(() => {
        if (deleteGroupData?.data?.deleteGroup) {
            syncPhilipsHue({...deleteGroupData?.data?.deleteGroup, force: true});
            setRoomToEdit(null);
        }
        if (deleteGroupData?.error) {
            notify(deleteGroupData.error.message, {
                variant: "error",
            });
        }
    }, [deleteGroupData]);

    const getRoomCount = () => {
        let rooms = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let bridge of philipsHue.bridges) {
                if (bridge?.groups) {
                    rooms = [...rooms, ...bridge.groups];
                }
            }
        }

        return rooms;
    };

    const getLightByRoom = (bridgeId) => {
        let lights = [];

        if (philipsHue?.bridges?.length > 0) {
            for (let bridge of philipsHue.bridges) {
                if (bridge?._id === bridgeId) {
                    lights = bridge.lights;
                }
            }
        }

        return lights;
    };

    const handleEditRoom = (room) => {
        setRoomToEdit(room);
        setName(room.name);
        setClassName(options.find((o) => o.value === room.class));
        setSelectedLights(room?.lights?.map((light) => light.lightId) ?? []);
    };

    const handleClose = () => {
        setRoomToEdit(null);
        setName("");
        setErrorName(null);
        setClassName("");
        setErrorClassName(null);
        setSelectedLights([]);
        setSelectedBridge(null);
    };

    const handleSelectLight = (light) => {
        const lightIndex = selectedLights.findIndex((l) => l === light.lightId);

        if (lightIndex === -1) {
            setSelectedLights((e) => [...e, light.lightId]);
        } else {
            setSelectedLights((e) => [...e.slice(0, lightIndex), ...e.slice(lightIndex + 1)]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validation = true;

        if (!name?.length || name?.length < 4) {
            setErrorName("Le nom de la pièce est trop court");
            validation = false;
        } else {
            setErrorName(null);
        }

        if (!className?.value) {
            setErrorClassName("Le type de la pièce est trop court");
            validation = false;
        } else {
            setErrorClassName(null);
        }

        if (!roomToEdit.bridgeId) {
            if (!selectedBridge) {
                setErrorBridge(true);
                validation = false;
            } else {
                setErrorBridge(null);
            }
        } else {
            setErrorBridge(null);
        }

        if (validation) {
            if (roomToEdit.bridgeId) {
                editGroupConfig({
                    variables: {
                        bridgeId: roomToEdit?.bridgeId,
                        groupId: roomToEdit?.groupId,
                        name,
                        class: className.value,
                        lights: selectedLights,
                    },
                });
            } else {
                addGroup({
                    variables: {
                        bridgeId: selectedBridge,
                        name,
                        class: className.value,
                        lights: selectedLights,
                    },
                });
            }
        }
    };

    const handleDeleteRoom = () => {
        // eslint-disable-next-line no-alert
        window.confirm("voulez vous vraiment surprimer cette pièce ?");

        deleteGroup({
            variables: {
                bridgeId: roomToEdit?.bridgeId,
                groupId: roomToEdit?.groupId,
            },
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <GoBack />
                <Button round size="sm" onClick={() => handleEditRoom({})}>
                    Ajouter une nouvelle pièce
                </Button>
            </div>
            <Title className={classes.title} bold>
                Gestion des Pièces et zones
            </Title>
            <Grid container>
                {getRoomCount().map((room, index) => {
                    return (
                        <Grid item lg={4} md={4} xs={12} key={`room/${index}`}>
                            <Card className={classes.room}>
                                <Icon size={40} className={classes.roomIcon}>
                                    {room.class}
                                </Icon>
                                <SmallTitle className={classes.roomTitle}>{room.name}</SmallTitle>
                                <Text className={classes.roomTitle}>{room.lights.length} lumières Hue</Text>
                                <Button onClick={() => handleEditRoom(room)} fullWidth>
                                    Configurer
                                </Button>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Modal
                open={!!roomToEdit}
                onClose={() => handleClose()}
                title={`${roomToEdit?.bridgeId ? "Edition d'une" : "Ajouter une"} Pièce Hue`}>
                <div className={classes.form}>
                    <form className={classes.roomFromWrapper} onSubmit={(e) => handleSubmit(e)}>
                        <div className={classes.input}>
                            <SmallTitle color="label" className={classes.label}>
                                Nom de la pièce Hue
                            </SmallTitle>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nom du room hue"
                                error={!!errorName}
                            />
                        </div>
                        <div className={classes.input}>
                            <SmallTitle color="label" className={classes.label}>
                                Nom du type de pièce Hue
                            </SmallTitle>
                            <Select
                                placeholder="Type de pièce hue"
                                defaultValue={className}
                                options={options}
                                error={!!errorClassName}
                                onChange={(e) => setClassName(e)}
                            />
                        </div>
                        {!roomToEdit?.bridgeId && (
                            <div className={classes.input}>
                                <SmallTitle color="label" className={classes.label}>
                                    Bridge
                                </SmallTitle>
                                <Select
                                    placeholder="Selectionnez un bridge"
                                    options={philipsHue?.bridges?.map((bridge) => ({
                                        value: bridge._id,
                                        label: bridge.name,
                                    }))}
                                    error={!!errorBridge}
                                    onChange={(e) => setSelectedBridge(e?.value)}
                                />
                            </div>
                        )}
                        <div className={classes.roomParamWrapper}>
                            {getLightByRoom(roomToEdit?.bridgeId ?? selectedBridge).map((light, index) => {
                                return (
                                    <div
                                        key={`light/${index}`}
                                        className={classes.light}
                                        onClick={() => handleSelectLight(light)}>
                                        <Icon className={classes.lightIcon}>{light.productname}</Icon>
                                        <SmallTitle className={classes.lightText}>{light.name}</SmallTitle>
                                        <Checkbox checked={selectedLights.includes(light.lightId)} />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={classes.roomFooter}>
                            <Button
                                round
                                size="sm"
                                type="submit"
                                loading={editGroupConfigData?.loading || addGroupData?.loading}>
                                Sauvegarder
                            </Button>
                            {roomToEdit?.bridgeId && (
                                <Button
                                    color="error"
                                    round
                                    size="sm"
                                    onClick={() => handleDeleteRoom()}
                                    loading={deleteGroupData?.loading}>
                                    Effacer
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default withStyles(style)(PhilipsHueRoom);

const EDIT_GROUP_CONFIG = gql`
    mutation editGroupConfig($bridgeId: ID!, $groupId: ID!, $name: String!, $class: String!, $lights: [ID!]!) {
        editGroupConfig(bridgeId: $bridgeId, groupId: $groupId, name: $name, class: $class, lights: $lights) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;

const ADD_GROUP = gql`
    mutation addGroup($bridgeId: ID!, $name: String!, $class: String!, $lights: [ID!]!) {
        addGroup(bridgeId: $bridgeId, name: $name, class: $class, lights: $lights) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;

const DELETE_GROUP = gql`
    mutation deleteGroup($bridgeId: ID!, $groupId: ID!) {
        deleteGroup(bridgeId: $bridgeId, groupId: $groupId) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
