import React, {Fragment, useEffect} from "react";
import {useLazyQuery, useSubscription} from "react-apollo";
import gql from "graphql-tag";
import {useDispatch} from "react-redux";
import {SYNC_DEVICE} from "../core/reducers/devicesConfig";
import {UPDATE_WEATHER_INFO} from "../core/reducers/weatherConfig";
import notify from "../core/snackbar/snackbar";
import {EventEmitter} from "../core/events/events";

const SyncDevices = ({children}) => {
    const dispatch = useDispatch();
    const [getPhilipsHue, philipsHue] = useLazyQuery(GET_DEVICE_DEVICES);

    const [getWeatherInfo, weatherInfo] = useLazyQuery(GET_WEATHER_INFO);

    const syncPhilipsHue = (payload) => dispatch({type: SYNC_DEVICE, payload});
    const updateWeatherInfo = (payload) => dispatch({type: UPDATE_WEATHER_INFO, payload});

    useSubscription(SUBSCRIPTION_SYNC_DEVICE, {
        onSubscriptionData: ({subscriptionData}) => {
            syncPhilipsHue(subscriptionData.data.syncAll.philipsHue);
        },
    });

    useSubscription(SUBSCRIPTION_SYNC_WEATHER, {
        onSubscriptionData: ({subscriptionData}) => {
            updateWeatherInfo(subscriptionData.data.syncWeather);
        },
        shouldResubscribe: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            getPhilipsHue();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        getWeatherInfo();
        getPhilipsHue();

        EventEmitter.subscribe("syncAllDevice", () => {
            getWeatherInfo();
            getPhilipsHue();
        });

        return () => {
            EventEmitter.remove("syncAllDevice");
        };
    }, []);

    useEffect(() => {
        if (weatherInfo?.data?.getWeatherInfo) {
            updateWeatherInfo(weatherInfo.data.getWeatherInfo);
        }
        if (weatherInfo?.error) {
            notify(weatherInfo?.error?.message, {
                variant: "error",
            });
        }
    }, [weatherInfo]);

    useEffect(() => {
        if (philipsHue?.data?.syncAll?.philipsHue) {
            syncPhilipsHue(philipsHue.data.syncAll.philipsHue);
        }
        if (philipsHue?.error) {
            notify(philipsHue?.error?.message, {
                variant: "error",
            });
        }
    }, [philipsHue]);

    return <Fragment>{children}</Fragment>;
};

export default SyncDevices;

export const philipsHueFragment = gql`
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
                groupId
                bridgeId
                name
                class
                lights {
                    lightId
                    bridgeId
                    name
                    productname
                    modelid
                    state {
                        on
                        bri
                        colormode
                        ct
                        xy {
                            x
                            y
                        }
                    }
                }
                state {
                    all_on
                    any_on
                }
            }
            lights {
                lightId
                bridgeId
                name
                productname
                modelid
                state {
                    on
                    bri
                    colormode
                    ct
                    xy {
                        x
                        y
                    }
                }
            }
        }
    }
`;

const weatherFragment = gql`
    fragment weatherFragment on Weather {
        _id
        city
        country
        visibility
        dt
        humidity
        temp
        feels_like
        temp_min
        temp_max
        pressure
        main
        description
        icon
        clouds
        wind
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

const GET_WEATHER_INFO = gql`
    query getWeatherInfo {
        getWeatherInfo {
            ...weatherFragment
        }
    }
    ${weatherFragment}
`;

const SUBSCRIPTION_SYNC_WEATHER = gql`
    subscription syncWeather {
        syncWeather {
            ...weatherFragment
        }
    }
    ${weatherFragment}
`;
