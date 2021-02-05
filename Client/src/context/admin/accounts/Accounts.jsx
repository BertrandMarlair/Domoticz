/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import style from "./AccountsStyle";
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
import Date from "../../../components/date/Date";
import AccountAdd from "../accountAdd/AccountAdd";
import {useHistory} from "react-router-dom";

const Account = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const history = useHistory();

    const {data, loading, error} = useQuery(GET_USERS);

    const handleManageAccount = (account) => {
        if (account.type === "user") {
            history.push(`/admin/user/${account._id}`);
        } else if (account.type === "device") {
            history.push(`/admin/device/${account._id}`);
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
            setAccounts(data.getAllUsers);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Card className={classes.addCard}>
                <div className={classes.addCardHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addCardIcon}>
                        Account
                    </Icon>
                    <SmallTitle className={classes.addCardTitle}>Gestion des utilisateurs</SmallTitle>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new account
                </Button>
            </Card>
            <Card noPadding>
                <TableContainer className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="center">Nom</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Permission</TableCell>
                                <TableCell align="center">Actif</TableCell>
                                <TableCell align="center">Vérifié</TableCell>
                                <TableCell className={classes.optionalDisplay} align="center">
                                    Création
                                </TableCell>
                                <TableCell className={classes.optionalDisplay} align="center">
                                    Dernière activité
                                </TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Error errorMessage={error} />
                            {accounts.map((account) => (
                                <TableRow key={account._id}>
                                    <TableCell align="center" component="th" scope="row">
                                        {account.name}
                                    </TableCell>
                                    <TableCell align="center">{account.type}</TableCell>
                                    <TableCell align="center">{account.permission}</TableCell>
                                    <TableCell align="center">
                                        <Icon color={getActiveColor(account.active)} className={classes.addAccountIcon}>
                                            {getActiveIcon(account.active)}
                                        </Icon>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Icon
                                            color={getActiveColor(account.basic.verified)}
                                            className={classes.addAccountIcon}>
                                            {getActiveIcon(account.basic.verified)}
                                        </Icon>
                                    </TableCell>
                                    <TableCell className={classes.optionalDisplay} align="center">
                                        {getDate(account.createdAt)}
                                    </TableCell>
                                    <TableCell className={classes.optionalDisplay} align="center">
                                        {getDate(account.basic.lastLogin)}
                                    </TableCell>
                                    <TableCell align="center" className={classes.editAccountButton}>
                                        <Button round size="sm" onClick={() => handleManageAccount(account)}>
                                            Manage
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            {loading && <Loading absolute />}
            <Modal open={open} onClose={() => handleCloseModal()}>
                <AccountAdd onClose={() => handleCloseModal()} />
            </Modal>
        </div>
    );
};

export default withStyles(style)(Account);

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
