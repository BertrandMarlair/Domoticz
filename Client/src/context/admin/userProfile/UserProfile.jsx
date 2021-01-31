import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./UserProfileStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import Text from "../../../components/typography/Text";
import Card from "../../../components/card/Card";
import Error from "../../../components/error/Error";
import Date from "../../../components/date/Date";
import UserManage from "../userManage/UserManage";
import Button from "../../../components/button/Button";
import UserDelete from "../userDelete/UserDelete";
import Modal from "../../../components/modal/SimpleModal";
import UserEdit from "../userEdit/UserEdit";
import UserPwdReset from "../userPwdReset/UserPwdReset";

const UserProfile = ({classes, match}) => {
    const id = match.params.userId;
    const [loaded, setLoaded] = useState(false);
    const [openResetPwdModal, setOpenResetPwdModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [user, setUser] = useState({});

    const [queryGetUserById, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (id) {
            queryGetUserById({variables: {_id: id}});
        }
    }, [id]);

    useEffect(() => {
        if (data?.getUserById) {
            setUser(data.getUserById);
        }
    }, [data]);

    const handleCloseModal = () => {
        setOpenResetPwdModal(false);
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

        return "Never";
    };

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <UserManage userId={match.params.userId}>
                <Fragment>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Profil du device {user.name}</SmallTitle>
                    </div>
                    <Card className={classes.item}>
                        <div className={classes.header}>
                            <SmallTitle className={classes.blockTitle}>Account</SmallTitle>
                        </div>
                        <CardContent>
                            <div className={classes.wrapper}>
                                <div className={classes.item}>
                                    <Text bold>Name : {user.name}</Text>
                                    <Text bold>Type : {user.type}</Text>
                                </div>
                                <div className={classes.item}>
                                    <Text bold>Actif : {user.active ? `yes` : `no`}</Text>
                                    <Text bold>Vérifié : {user.basic?.verified ? `yes` : `no`}</Text>
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
                                Création : {getDate(user.createdAt, "LLL")}
                            </Text>
                            <Text className={classes.wrapper} bold>
                                Modifié : {getDate(user.updatedAt, "LLL")}
                            </Text>
                            <Text className={classes.wrapper} bold>
                                Dernière connexion : {getDate(user.lastLogin, "LLL")}
                            </Text>
                        </CardContent>
                    </Card>
                    <div className={classes.wrapperBtn}>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenResetPwdModal(true)}>
                            Reset Password
                        </Button>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenEditModal(true)}>
                            Edit
                        </Button>
                        <Button container={classes.itemBtn} round size="sm" onClick={() => setOpenDeleteModal(true)}>
                            Delete
                        </Button>
                    </div>
                </Fragment>
            </UserManage>
            {loading && <Loading absolute />}
            <Modal open={openResetPwdModal} onClose={() => handleCloseModal()}>
                <UserPwdReset user={user} onClose={() => handleCloseModal()} />
            </Modal>
            <Modal open={openEditModal} onClose={() => handleCloseModal()}>
                <UserEdit user={user} onClose={() => handleCloseModal()} setUser={setUser} />
            </Modal>
            <Modal open={openDeleteModal} onClose={() => handleCloseModal()}>
                <UserDelete user={user} />
            </Modal>
        </div>
    );
};

export default withStyles(style)(UserProfile);

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
