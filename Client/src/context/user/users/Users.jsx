/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from "react";
import {withStyles, Grid} from "@material-ui/core";
import style from "./UsersStyle";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import {useTheme} from "@material-ui/styles";
import SmallTitle from "../../../components/typography/SmallTitle";

const User = ({classes}) => {
    const [loaded, setLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const theme = useTheme();

    const {data, loading, error} = useQuery(GET_USERS);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        console.log("----- GET USERS -----");
        if (data?.getAllUsers) {
            console.log(data);
            setUsers(data.getAllUsers);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Card className={classes.addUser}>
                <div className={classes.addUserHeader}>
                    <Icon color={theme.palette.primary.main} className={classes.addUserIcon}>
                        Checked
                    </Icon>
                    <div>
                        <SmallTitle className={classes.addUserTitle}>Créer un nouvel utilisateur</SmallTitle>
                        <Text className={classes.addProviderText} color="lightGrey">
                            text
                        </Text>
                    </div>
                </div>
                <Button round size="sm" onClick={() => setOpen(true)}>
                    Add new user
                </Button>
            </Card>
            <Grid container className={classes.container}>
                <Error errorMessage={error} />
                {users.map((user) => (
                    <Grid item lg={4} md={4} xs={12} key={`user/${user._id}`} className={classes.gridItem}>
                        <Card className={classes.card}>
                            <Title bold center>
                                {user.name}
                            </Title>
                        </Card>
                    </Grid>
                ))}
            </Grid>
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
        }
    }
`;
