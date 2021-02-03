import React, {Fragment, Suspense} from "react";
import MediaQuery from "react-responsive";

import {withStyles} from "@material-ui/core";
import style from "./Style";

import {mediaQuerySizeXs, widthSideBar} from "../../../core/style/constant";
import LoaderLayout from "../../../components/loading/LoaderLayout";
import Header from "../../../components/header/Header";

const Layout = ({children, classes}) => {
    return (
        <Fragment>
            <Suspense fallback={<LoaderLayout />}>
                <MediaQuery query={`(min-width: ${mediaQuerySizeXs}px)`}>
                    <div
                        className={classes.drawer}
                        style={{
                            paddingLeft: widthSideBar,
                        }}>
                        <div className={classes.drawerWrapper} id="dashboard">
                            {children}
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query={`(max-width: ${mediaQuerySizeXs}px)`}>
                    <div className={classes.drawerSmall}>
                        <Header />
                        <div className={classes.drawerWrapper} id="dashboard">
                            {children}
                        </div>
                    </div>
                </MediaQuery>
            </Suspense>
        </Fragment>
    );
};

export default withStyles(style)(Layout);
