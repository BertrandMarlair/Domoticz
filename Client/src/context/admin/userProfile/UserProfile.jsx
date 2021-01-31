import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./UserProfileStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";
import {useHistory} from "react-router-dom";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import Text from "../../../components/typography/Text";
import Card from "../../../components/card/Card";
import Error from "../../../components/error/Error";
import Date from "../../../components/date/Date";
import UserManage from "../userManage/UserManage";
import Button from "../../../components/button/Button";
import AccountDelete from "../accountDelete/AccountDelete";
import Modal from "../../../components/modal/SimpleModal";
import AccountPwdEdit from "../accountPwdEdit/AccountPwdEdit";
import AccountEdit from "../accountEdit/AccountEdit";
import AccountTypeEdit from "../accountTypeEdit/AccountTypeEdit";

const UserProfile = ({classes, match}) => {
    const id = match.params.userId;
    const [loaded, setLoaded] = useState(false);
    const [openResetPwdModal, setOpenResetPwdModal] = useState(false);
    const [openEditTypeModal, setOpenEditTypeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [user, setUser] = useState({});

    const history = useHistory();

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
            if (data.getUserById.type === "device") {
                history.push(`/admin/device/${data.getUserById._id}`);
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

        return "Never";
    };

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <UserManage userId={match.params.userId}>
                <Fragment>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Profil de l&apos;utilisateur {user.name}</SmallTitle>
                    </div>
                    <Card>
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
                        <Button size="sm" onClick={() => setOpenResetPwdModal(true)}>
                            Reset Password
                        </Button>
                        <Button size="sm" onClick={() => setOpenEditTypeModal(true)}>
                            Change Type
                        </Button>
                        <Button size="sm" onClick={() => setOpenEditModal(true)}>
                            Edit
                        </Button>
                        <Button size="sm" onClick={() => setOpenDeleteModal(true)}>
                            Delete
                        </Button>
                    </div>
                </Fragment>
            </UserManage>
            {loading && <Loading absolute />}
            <Modal open={openResetPwdModal} onClose={() => handleCloseModal()}>
                <AccountPwdEdit account={user} onClose={() => handleCloseModal()} />
            </Modal>
            <Modal open={openEditTypeModal} onClose={() => handleCloseModal()}>
                <AccountTypeEdit account={user} onClose={() => handleCloseModal()} />
            </Modal>
            <Modal open={openEditModal} onClose={() => handleCloseModal()}>
                <AccountEdit account={user} onClose={() => handleCloseModal()} setAccount={setUser} />
            </Modal>
            <Modal open={openDeleteModal} onClose={() => handleCloseModal()}>
                <AccountDelete account={user} />
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
