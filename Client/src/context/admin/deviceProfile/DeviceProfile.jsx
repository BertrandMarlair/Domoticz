import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./DeviceProfileStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import Text from "../../../components/typography/Text";
import Card from "../../../components/card/Card";
import Error from "../../../components/error/Error";
import Date from "../../../components/date/Date";
import DeviceManage from "../deviceManage/DeviceManage";
import AccountDelete from "../accountDelete/AccountDelete";
import Modal from "../../../components/modal/SimpleModal";
import Button from "../../../components/button/Button";
import AccountPwdEdit from "../accountPwdEdit/AccountPwdEdit";
import AccountEdit from "../accountEdit/AccountEdit";
import AccountTypeEdit from "../accountTypeEdit/AccountTypeEdit";

const DeviceProfile = ({classes, match}) => {
    const id = match.params.deviceId;
    const [loaded, setLoaded] = useState(false);
    const [openResetPwdModal, setOpenResetPwdModal] = useState(false);
    const [openEditTypeModal, setOpenEditTypeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [device, setDevice] = useState({});

    const [queryGetDeviceById, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (id) {
            queryGetDeviceById({variables: {_id: id}});
        }
    }, [id]);

    useEffect(() => {
        if (data?.getUserById) {
            setDevice(data.getUserById);
            if (data.getUserById.type === "user") {
                history.push(`/admin/user/${data.getUserById._id}`);
            }
        }
    }, [data]);

    const handleCloseModal = () => {
        setOpenResetPwdModal(false);
        setOpenEditTypeModal(false);
        setOpenEditModal(false);
        setOpenDeleteModal(false);
    };

    const getDate = (date, format) => {
        if (date != null && date !== "") {
            return (
                <Date className={classes.date} format={format} bold>
                    {date}
                </Date>
            );
        }

        return "None";
    };

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <DeviceManage deviceId={match.params.deviceId}>
                <Fragment>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Profil du device {device.name}</SmallTitle>
                    </div>
                    <Card className={classes.item}>
                        <div className={classes.header}>
                            <SmallTitle className={classes.blockTitle}>Account</SmallTitle>
                        </div>
                        <CardContent>
                            <div className={classes.wrapper}>
                                <div className={classes.item}>
                                    <Text bold>Name : {device.name}</Text>
                                    <Text bold>Type : {device.type}</Text>
                                </div>
                                <div className={classes.item}>
                                    <Text bold>Actif : {device.active ? `yes` : `no`}</Text>
                                    <Text bold>Vérifié : {device.basic?.verified ? `yes` : `no`}</Text>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <div className={classes.header}>
                            <SmallTitle className={classes.blockTitle}>Activity</SmallTitle>
                        </div>
                        <CardContent>
                            <Text className={classes.wrapper} bold>
                                Création : {getDate(device.createdAt, "LLL")}
                            </Text>
                            <Text className={classes.wrapper} bold>
                                Modifié : {getDate(device.updatedAt, "LLL")}
                            </Text>
                            <Text className={classes.wrapper} bold>
                                Dernière connexion : {getDate(device.lastLogin, "LLL")}
                            </Text>
                        </CardContent>
                    </Card>
                    <div className={classes.wrapperBtn}>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenResetPwdModal(true)}>
                            Reset Password
                        </Button>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenEditTypeModal(true)}>
                            Change Type
                        </Button>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenEditModal(true)}>
                            Edit
                        </Button>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenDeleteModal(true)}>
                            Delete
                        </Button>
                    </div>
                </Fragment>
            </DeviceManage>
            {loading && <Loading absolute />}
            <Modal open={openResetPwdModal} onClose={() => handleCloseModal()}>
                <AccountPwdEdit account={device} onClose={() => handleCloseModal()} />
            </Modal>
            <Modal open={openEditTypeModal} onClose={() => handleCloseModal()}>
                <AccountTypeEdit account={device} onClose={() => handleCloseModal()} />
            </Modal>
            <Modal open={openEditModal} onClose={() => handleCloseModal()}>
                <AccountEdit account={device} onClose={() => handleCloseModal()} setAccount={setDevice} />
            </Modal>
            <Modal open={openDeleteModal} onClose={() => handleCloseModal()}>
                <AccountDelete account={device} />
            </Modal>
        </div>
    );
};

export default withStyles(style)(DeviceProfile);

const GET_USER_BY_ID = gql`
    query getUserById($_id: ID!) {
        getUserById(_id: $_id) {
            _id
            name
            type
            active
            permission
            basic {
                verified
                lastLogin
            }
            createdAt
            updatedAt
        }
    }
`;
