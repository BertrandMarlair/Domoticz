import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./UserPermissionsStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import UserManage from "../userManage/UserManage";
import Error from "../../../components/error/Error";
import Card from "../../../components/card/Card";
import Text from "../../../components/typography/Text";

const UserPermissions = ({classes, match}) => {
    const id = match.params.userId;
    const [loaded, setLoaded] = useState(false);
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

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <UserManage userId={match.params.userId}>
                <Fragment className={classes.profile}>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>
                            Permissions de l&apos;utilisateur {user.name}
                        </SmallTitle>
                    </div>
                    <Card className={classes.item}>
                        <div className={classes.header}>
                            <SmallTitle className={classes.blockTitle}>Permissions</SmallTitle>
                        </div>
                        <CardContent>
                            <div className={classes.wrapper}>
                                <div className={classes.item}>
                                    <Text bold>Id : {user._id}</Text>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Fragment>
            </UserManage>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(UserPermissions);

const GET_USER_BY_ID = gql`
    query getUserById($_id: ID!) {
        getUserById(_id: $_id) {
            _id
            name
        }
    }
`;
