import React, {Fragment, useEffect} from "react";
import {useLazyQuery, useSubscription} from "react-apollo";
import gql from "graphql-tag";
import {useDispatch} from "react-redux";
import {SYNC_DEVICE} from "../core/reducers/devicesConfig";
import notify from "../core/snackbar/snackbar";
import {EventEmitter} from "../core/events/events";

const SyncDevices = ({children}) => {
    const dispatch = useDispatch();
    const [getPhilipsHue, philipsHue] = useLazyQuery(GET_DEVICE_DEVICES);

    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});

    useSubscription(SUBSCRIPTION_SYNC_DEVICE, {
        onSubscriptionData: ({subscriptionData}) => {
            syncPhilipsHue(subscriptionData.data.syncAll);
        },
    });

    useEffect(() => {
        getPhilipsHue();

        EventEmitter.subscribe("syncAllDevice", () => {
            getPhilipsHue();
        });

        return () => {
            EventEmitter.remove("syncAllDevice");
        };
    }, []);

    useEffect(() => {
        if (philipsHue?.data?.syncAll) {
            syncPhilipsHue(philipsHue.data.syncAll);
        }
        if (philipsHue?.error) {
            notify(philipsHue?.error?.message, {
                variant: "false",
            });
        }
    }, [philipsHue]);

    return <Fragment>{children}</Fragment>;
};

export default SyncDevices;

const philipsHueFragment = gql`
    fragment philipsHueFragment on PhilipsHue {
        _id
        title
        description
        bridges {
            _id
            providerId
            ipAddress
            token
            config {
                name
            }
            groups {
                bridgeId
                name
                class
                lights {
                    bridgeId
                    name
                }
            }
            lights {
                bridgeId
                productname
                name
            }
        }
    }
`;

const GET_DEVICE_DEVICES = gql`
    query syncAll {
        syncAll {
            philipsHue {
                ...philipsHueFragment
            }
        }
    }
    ${philipsHueFragment}
`;

const SUBSCRIPTION_SYNC_DEVICE = gql`
    subscription syncAll {
        syncAll {
            philipsHue {
                ...philipsHueFragment
            }
        }
    }
    ${philipsHueFragment}
`;
