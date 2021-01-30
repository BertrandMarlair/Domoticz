import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./UserProfileStyle";
import {useTheme} from "@material-ui/styles";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import Text from "../../../components/typography/Text";
import Card from "../../../components/card/Card";
import Error from "../../../components/error/Error";
import Date from "../../../components/date/Date";
import Icon from "../../../components/icon/Icon";
import UserManage from "../userManage/UserManage";

const UserProfile = ({classes, match}) => {
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState(match.params.userId);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [active, setActive] = useState(null);
    const [verified, setVerified] = useState(null);
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdated] = useState("");
    const [lastLogin, setLastLogin] = useState("");

    const theme = useTheme();
    const [queryGetUserById, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (id) {
            console.log("getUserById");
            console.log(id);
            queryGetUserById({variables: {_id: id}});
        }
    }, [id]);

    useEffect(() => {
        console.log("data");
        console.log(data);
        if (data?.getUserById) {
            console.log(data);
            setId(data.getUserById.id);
            setName(data.getUserById.name);
            setType(data.getUserById.type);
            setActive(data.getUserById.active);
            setVerified(data.getUserById.basic.verified);
            setCreatedAt(data.getUserById.createdAt);
            setUpdated(data.getUserById.updatedAt);
            setLastLogin(data.getUserById.basic.lastLogin);
        }
    }, [data]);

    const getDate = (date, format) => {
        if (date != null && date !== "") {
            return (
                <Date className={classes.date} format={format}>
                    {date}
                </Date>
            );
        }
    };

    const getActiveIcon = (b) => {
        return b === true ? "Checked" : "Close";
    };

    const getActiveColor = (b) => {
        return b === true ? theme.palette.primary.main : theme.palette.text.default;
    };

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <UserManage userId={match.params.userId}>
                <Fragment className={classes.profile}>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Profil du device {name}</SmallTitle>
                    </div>
                    <Card className={classes.mainBlock}>
                        <SmallTitle className={classes.blockTitle}>Account</SmallTitle>
                        <CardContent>
                            <Text>Name : {name}</Text>
                            <Text>Type : {type}</Text>
                        </CardContent>
                    </Card>
                    <div className={classes.wrapper}>
                        <Card className={classes.item}>
                            <SmallTitle className={classes.blockTitle}>Status</SmallTitle>
                            <CardContent>
                                <div className={classes.wrapper}>
                                    <Text>Actif</Text>
                                    <Icon color={getActiveColor(active)} className={classes.addUserIcon}>
                                        {getActiveIcon(active)}
                                    </Icon>
                                </div>
                                <div className={classes.wrapper}>
                                    <Text>Vérifié</Text>
                                    <Icon color={getActiveColor(verified)} className={classes.addUserIcon}>
                                        {getActiveIcon(verified)}
                                    </Icon>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className={classes.item}>
                            <SmallTitle className={classes.blockTitle}>Activity</SmallTitle>
                            <CardContent>
                                <div className={classes.wrapper}>
                                    <Text bold>Création : </Text>
                                    {getDate(createdAt, "LLL")}
                                </div>
                                <div className={classes.wrapper}>
                                    <Text bold>Modifié : </Text>
                                    {getDate(updatedAt, "LLL")}
                                </div>
                                <div className={classes.wrapper}>
                                    <Text bold>Dernière connexion : </Text>
                                    {getDate(lastLogin, "LLL")}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Fragment>
            </UserManage>
            {loading && <Loading absolute />}
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
