import React, {useState, useEffect, Fragment} from "react";
import {CardContent, withStyles} from "@material-ui/core";
import style from "./DeviceScenesStyle";
import gql from "graphql-tag";
import {useLazyQuery} from "@apollo/react-hooks";

import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import Error from "../../../components/error/Error";
import Text from "../../../components/typography/Text";
import DeviceManage from "../deviceManage/DeviceManage";
import Card from "../../../components/card/Card";

const DeviceScenes = ({classes, match}) => {
    const id = match.params.deviceId;
    const [loaded, setLoaded] = useState(false);
    const [device, setDevice] = useState({});

    const [queryGetDeviceById, {data, loading, error}] = useLazyQuery(GET_USER_BY_ID);

    useEffect(() => {
        if (!loading && loaded === false) {
            setLoaded(true);
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (id) {
            queryGetDeviceById({variables: {_id: id}});
        }
    }, [id]);

    useEffect(() => {
        if (data?.getUserById) {
            setDevice(data.getUserById);
        }
    }, [data]);

    return (
        <div className={classes.root}>
            <Error errorMessage={error} />
            <DeviceManage deviceId={match.params.deviceId}>
                <Fragment className={classes.profile}>
                    <div className={classes.header}>
                        <SmallTitle className={classes.usersTitle}>Scènes du device {device.name}</SmallTitle>
                    </div>
                    <Card className={classes.item}>
                        <div className={classes.header}>
                            <SmallTitle className={classes.blockTitle}>Scènes</SmallTitle>
                        </div>
                        <CardContent>
                            <div className={classes.wrapper}>
                                <div className={classes.item}>
                                    <Text bold>Id : {device._id}</Text>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Fragment>
            </DeviceManage>
            {loading && <Loading absolute />}
        </div>
    );
};

export default withStyles(style)(DeviceScenes);

const GET_USER_BY_ID = gql`
    query getUserById($_id: ID!) {
        getUserById(_id: $_id) {
            _id
            name
        }
    }
`;
