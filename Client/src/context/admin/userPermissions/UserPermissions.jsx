import React, {useState, useEffect, Fragment} from "react";
import {withStyles} from "@material-ui/core";
import style from "./UserPermissionsStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import UserManage from "../userManage/UserManage";
import Error from "../../../components/error/Error";

const UserPermissions = ({classes, match}) => {
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState(match.params.userId);
    const [name, setName] = useState("");

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
            setId(data.getUserById.id);
            setName(data.getUserById.name);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <UserManage userId={match.params.userId}>
                <Fragment className={classes.profile}>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Permissions de l&lsquo;utilsateur {name}</SmallTitle>
                    </div>
                    <div className={classes.content}></div>
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
