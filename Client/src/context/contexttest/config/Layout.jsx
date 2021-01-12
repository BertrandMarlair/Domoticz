import React, {Fragment, Suspense} from "react";
import MediaQuery from "react-responsive";

import {withStyles} from "@material-ui/core";
import style from "./Style";

import SideBar from "../../../components/sideBar/SideBar";

import {mediaQuerySizeXs, widthSideBar} from "../../../core/style/constant";
import useMenu from "../config/useMenu";
import LoaderLayout from "../../../components/loading/LoaderLayout";

const Layout = ({children, classes}) => {
    const menu = useMenu();

    return (
        <Fragment>
            <SideBar menu={menu} />
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
