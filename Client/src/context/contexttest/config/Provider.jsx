import React from "react";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";

import isAuthenticated from "../../../core/auth/isAuthenticated";
import {defaultRoute} from "./router";

const Provider = ({component: Component, ...rest}) => {
    const checkAuth = () => {
        if (!isAuthenticated()) {
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        }
        return <Redirect to={defaultRoute} />;
    };

    return checkAuth();
};

export default Provider;
