import React, {useEffect, useState} from "react";
import gql from "graphql-tag";
import {Grid, withStyles} from "@material-ui/core";
import style from "./SceneSelectorStyle";
import {useMutation, useQuery} from "react-apollo";
import Error from "../../error/Error";
import SceneItem from "./SceneItem";
import {useDispatch} from "react-redux";
import {SYNC_DEVICE} from "../../../core/reducers/devicesConfig";
import {philipsHueFragment} from "../../../app/SyncDevices";

const SceneSelector = ({classes, group}) => {
    const dispatch = useDispatch();
    const [scenes, setScenes] = useState([]);
    const [targetSceneId, setTargetScene] = useState(null);
    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    const {data, error} = useQuery(GET_SCENES_BY_GROUP, {
        variables: {
            bridgeId: group.bridgeId,
            groupId: group.groupId,
        },
    });
    const [editGroupState, editGroupStateData] = useMutation(EDIT_GROUP);

    useEffect(() => {
        if (data && data.getScenesByGroup) {
            setScenes(data.getScenesByGroup);
        }
    }, [data]);

    useEffect(() => {
        if (editGroupStateData?.data?.editGroupState) {
            syncPhilipsHue({...editGroupStateData?.data?.editGroupState, force: true});
        }
    }, [editGroupStateData]);

    const handleTargetScene = (sceneId) => {
        setTargetScene(sceneId);
        editGroupState({
            variables: {
                bridgeId: group.bridgeId,
                groupId: group.groupId,
                state: {
                    on: true,
                    scene: sceneId,
                },
            },
        });
    };

    const caseInsensitiveSort = (a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    };

    return (
        <div className={classes.root}>
            {error && <Error errorMessage={error.message} />}
            <Grid container className={classes.wrapper}>
                {scenes.sort(caseInsensitiveSort).map((scene) => (
                    <SceneItem
                        key={`scene/${scene.sceneId}`}
                        scene={scene}
                        targetSceneId={targetSceneId}
                        handleTargetScene={handleTargetScene}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default withStyles(style)(SceneSelector);

const GET_SCENES_BY_GROUP = gql`
    query getScenesByGroup($groupId: ID!, $bridgeId: ID!) {
        getScenesByGroup(groupId: $groupId, bridgeId: $bridgeId) {
            bridgeId
            sceneId
            group
            name
            type
            lightstates {
                lightId
                on
                ct
                bri
                xy {
                    x
                    y
                }
            }
        }
    }
`;

const EDIT_GROUP = gql`
    mutation editGroupState($bridgeId: ID!, $groupId: ID!, $state: PhilipsHueStateInput!) {
        editGroupState(bridgeId: $bridgeId, groupId: $groupId, state: $state) {
            ...philipsHueFragment
        }
    }
    ${philipsHueFragment}
`;
