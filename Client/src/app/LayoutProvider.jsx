/* eslint-disable no-case-declarations */
import React, {useMemo, useEffect, lazy} from "react";

import {withRouter, Redirect, Switch} from "react-router-dom";
import {useSnackbar} from "notistack";
import SideBar from "../components/sideBar/SideBar";
import Connected from "../components/connected/Connected";

import "../core/style/style.css";
import {SNACKBAR_EVENT} from "../core/constants";

import globalRoute from "../context/global/config/router";
import {defaultRoute as globalDefaultRoute} from "../context/global/config/router";

import disconnectedRoute from "../context/disconnected/config/router";
import {defaultRoute as disconnectedDefaultRoute} from "../context/disconnected/config/router";

import contexttestRoute from "../context/contexttest/config/router";
import {defaultRoute as contexttestDefaultRoute} from "../context/contexttest/config/router";

import providerRoute from "../context/provider/config/router";
import {defaultRoute as providerDefaultRoute} from "../context/provider/config/router";

import NotFound from "../context/public/notFound/NotFound";

import {EventEmitter} from "../core/events/events";

const LayoutProvider = ({location}) => {
    const layoutContainerTarget = useMemo(() => location.pathname.replace("/", "").split("/")[0], [location.pathname]);

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        EventEmitter.subscribe(SNACKBAR_EVENT, (notify) => {
            const {text, params} = notify;

            enqueueSnackbar(text, {...params, action: (key) => params.action(closeSnackbar, key)});
        });

        return () => {
            EventEmitter.remove(SNACKBAR_EVENT);
        };
        // eslint-disable-next-line
    }, [enqueueSnackbar]);

    const renderLayout = useMemo(() => {
        switch (layoutContainerTarget) {
            case "app":
                const AppLayout = lazy(() => import("../context/global/config/Layout"));
                const AppProvider = lazy(() => import("../context/global/config/Provider"));

                return (
                    <AppLayout>
                        <Switch>
                            {globalRoute.map((params, index) => (
                                <AppProvider {...params} key={`dynamicRoute${index}`} />
                            ))}
                            <Redirect to={globalDefaultRoute} />
                        </Switch>
                    </AppLayout>
                );
            case "connect":
                const ConnectLayout = lazy(() => import("../context/disconnected/config/Layout"));
                const ConnectProvider = lazy(() => import("../context/disconnected/config/Provider"));

                return (
                    <ConnectLayout>
                        <Switch>
                            {disconnectedRoute.map((params, index) => (
                                <ConnectProvider {...params} key={`dynamicRoute${index}`} />
                            ))}
                            <Redirect to={disconnectedDefaultRoute} />
                        </Switch>
                    </ConnectLayout>
                );
            case "provider":
                const AddLayout = lazy(() => import("../context/provider/config/Layout"));
                const AddProvider = lazy(() => import("../context/provider/config/Provider"));

                return (
                    <AddLayout>
                        <Switch>
                            {providerRoute.map((params, index) => (
                                <AddProvider {...params} key={`dynamicRoute${index}`} />
                            ))}
                            <Redirect to={providerDefaultRoute} />
                        </Switch>
                    </AddLayout>
                );
            case "contexttest":
                const ContexttestLayout = lazy(() => import("../context/contexttest/config/Layout"));
                const ContexttestProvider = lazy(() => import("../context/contexttest/config/Provider"));

                return (
                    <ContexttestLayout>
                        <Switch>
                            {contexttestRoute.map((params, index) => (
                                <ContexttestProvider {...params} key={`dynamicRoute${index}`} />
                            ))}
                            <Redirect to={contexttestDefaultRoute} />
                        </Switch>
                    </ContexttestLayout>
                );
            default:
                return <NotFound />;
        }
    }, [layoutContainerTarget]);

    return (
        <main style={{height: "100%", display: "flex"}}>
            <Connected>
                <SideBar />
            </Connected>
            {renderLayout}
        </main>
    );
};

export default withRouter(LayoutProvider);
