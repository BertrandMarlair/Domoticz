/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
// import {useTranslation} from "react-i18next";
import style from "./UsersStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";

import {
    withStyles,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    MenuItem,
    MenuList,
    IconButton,
} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";

import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import SmallTitle from "../../../components/typography/SmallTitle";
import GoBack from "../../../components/goBack/GoBack";
import Popper from "../../../components/popper/Popper";
import Modal from "../../../components/modal/SimpleModal";

const User = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [anchorElOption, setAnchorElOption] = useState(false);
    const theme = useTheme();

    // const {t} = useTranslation();
    const {data, loading, error} = useQuery(GET_USERS);

    const handleEditUser = () => {
        setOpen(true);
    };

    const handleActiveUser = () => {
        setOpen(true);
    };

    const handleDeleteUser = () => {
        setOpen(true);
    };

    const handleClickOption = (event, userId) => {
        setAnchorElOption({event: event.currentTarget, userId});
    };

    const handleCloseOption = () => {
        setAnchorElOption(null);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const getActiveIcon = (b) => {
        return b === true ? "Checked" : "Close";
    };

    const getActiveColor = (b) => {
        return b === true ? theme.palette.primary.main : "white";
    };

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (data?.getAllUsers) {
            console.log(data);
            setUsers(data.getAllUsers);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <GoBack />
            <Card className={classes.addUser}>
                <div className={classes.addUserHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addUserIcon}>
                        Verified
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
                            <TableCell>Nom</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Permission</TableCell>
                            <TableCell>Actif</TableCell>
                            <TableCell>Vérifié</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <Error errorMessage={error} />
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell>{user.type}</TableCell>
                                <TableCell>{user.permission}</TableCell>
                                <TableCell>
                                    <Icon color={getActiveColor(user.active)} className={classes.addUserIcon}>
                                        {getActiveIcon(user.active)}
                                    </Icon>
                                </TableCell>
                                <TableCell>
                                    <Icon color={getActiveColor(user.basic.verified)} className={classes.addUserIcon}>
                                        {getActiveIcon(user.basic.verified)}
                                    </Icon>
                                </TableCell>
                                <TableCell align="center" className={classes.editUserButton}>
                                    <IconButton onClick={(e) => handleClickOption(e, user._id)}>
                                        <Icon>More</Icon>
                                    </IconButton>
                                </TableCell>
                                <Popper
                                    placement={"bottom"}
                                    anchorEl={anchorElOption?.userId === user._id && anchorElOption.event}
                                    handleClose={handleCloseOption}>
                                    <MenuList>
                                        <MenuItem onClick={() => handleEditUser(user)}>
                                            <SmallTitle normal>Voir</SmallTitle>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleEditUser(user)}>
                                            <SmallTitle normal>Modifier</SmallTitle>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleActiveUser(user)}>
                                            <SmallTitle normal>{user.active ? "Désactiver" : "Activer"}</SmallTitle>
                                        </MenuItem>
                                        <MenuItem onClick={() => handleDeleteUser(user)}>
                                            <SmallTitle normal>Supprimer</SmallTitle>
                                        </MenuItem>
                                    </MenuList>
                                </Popper>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <Loading absolute />}
            <Modal open={open} onClose={() => handleCloseModal()}>
                <SmallTitle normal>Edit user</SmallTitle>
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
            }
            createdAt
            updatedAt
        }
    }
`;
