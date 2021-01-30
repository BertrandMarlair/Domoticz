/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
// import {useTranslation} from "react-i18next";
import style from "./UsersStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";

import {withStyles, TableContainer, Table, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";

import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Modal from "../../../components/modal/SimpleModal";
import Card from "../../../components/card/Card";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import SmallTitle from "../../../components/typography/SmallTitle";
import GoBack from "../../../components/goBack/GoBack";
import Date from "../../../components/date/Date";
import UserAdd from "../userAdd/UserAdd";
import {useHistory} from "react-router-dom";

const User = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const history = useHistory();

    // const {t} = useTranslation();
    const {data, loading, error} = useQuery(GET_USERS);

    const handleManageUser = (user) => {
        if (user.type === "user") {
            history.push(`/admin/user/${user._id}`);
        } else if (user.type === "device") {
            history.push(`/admin/device/${user._id}`);
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const getActiveIcon = (b) => {
        return b === true ? "Checked" : "Close";
    };

    const getActiveColor = (b) => {
        return b === true ? theme.palette.primary.main : theme.palette.text.default;
    };

    const getDate = (date) => {
        if (date != null && date !== "") {
            return <Date bold>{date}</Date>;
        }
    };

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllUsers) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <GoBack />
            <Card className={classes.addUser}>
                <div className={classes.addUserHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addUserIcon}>
                        Account
                    </Icon>
                    <SmallTitle className={classes.usersTitle}>Gestion des utilisateurs</SmallTitle>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new user
                </Button>
            </Card>
            <TableContainer className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align="center">Nom</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Permission</TableCell>
                            <TableCell align="center">Actif</TableCell>
                            <TableCell align="center">Vérifié</TableCell>
                            <TableCell align="center">Création</TableCell>
                            <TableCell align="center">Dernière activité</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Error errorMessage={error} />
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell align="center" component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="center">{user.type}</TableCell>
                                <TableCell align="center">{user.permission}</TableCell>
                                <TableCell align="center">
                                    <Icon color={getActiveColor(user.active)} className={classes.addUserIcon}>
                                        {getActiveIcon(user.active)}
                                    </Icon>
                                </TableCell>
                                <TableCell align="center">
                                    <Icon color={getActiveColor(user.basic.verified)} className={classes.addUserIcon}>
                                        {getActiveIcon(user.basic.verified)}
                                    </Icon>
                                </TableCell>
                                <TableCell align="center">{getDate(user.createdAt)}</TableCell>
                                <TableCell align="center">{getDate(user.basic.lastLogin)}</TableCell>
                                <TableCell align="center" className={classes.editUserButton}>
                                    <Button round size="sm" onClick={() => handleManageUser(user)}>
                                        Manage
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <Loading absolute />}
            <Modal open={open} onClose={() => handleCloseModal()}>
                <UserAdd onClose={() => handleCloseModal()} />
            </Modal>
        </div>
    );
};

export default withStyles(style)(User);

const GET_USERS = gql`
    query getAllusers {
        getAllUsers {
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
