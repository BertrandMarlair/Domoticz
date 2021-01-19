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
import Card from "../../../components/card/Card";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import SmallTitle from "../../../components/typography/SmallTitle";
import GoBack from "../../../components/goBack/GoBack";

const User = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const theme = useTheme();

    // const {t} = useTranslation();
    const {data, loading, error} = useQuery(GET_USERS);

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
            <Card className={classes.addUser}>
                <div className={classes.addUserHeader}>
                    <GoBack />
                    <Icon color={theme.palette.primary.main} className={classes.addUserIcon}>
                        Checked
                    </Icon>
                    <div>
                        <SmallTitle className={classes.usersTitle}>Gestion des utilisateurs</SmallTitle>
                    </div>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new user
                </Button>
            </Card>
            <TableContainer className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Permission</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <Loading absolute />}
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
            permission
        }
    }
`;
