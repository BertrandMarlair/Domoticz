import React, {Fragment, Suspense} from "react";

import {IconButton, useTheme, withStyles} from "@material-ui/core";
import style from "./Style";

import {widthSideBar, mediaQuerySizeXs} from "../../../core/style/constant";
import LoaderLayout from "../../../components/loading/LoaderLayout";
import SmallTitle from "../../../components/typography/SmallTitle";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Card from "../../../components/card/Card";
import Icon from "../../../components/icon/Icon";
import {NavLink, useLocation} from "react-router-dom";
import Header from "../../../components/header/Header";
import MediaQuery from "react-responsive";

const LayoutConfig = ({children, classes}) => {
    const theme = useTheme();
    const location = useLocation();

    const selectedStyle = {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.palette.boxShadow.main,
        borderBottom: "1px solid transparent",
        borderRadius: 10,
    };

    const settingsConfig = [
        {
            icon: "Account",
            title: "Account",
            description: "Changer les paramètres concernant votre compte",
            path: "/settings/account",
        },
        {
            icon: "Weather",
            title: "Weather",
            description: "Changer les paramètres concernant la météo",
            path: "/settings/weather",
        },
    ];

    return (
        <div className={classes.drawerWrapper} id="dashboard">
            <Card className={classes.header}>
                <Title bold>Paramètres</Title>
                <Text>Changer les paramètres concernant votre compte, la tablette ou tout autres options</Text>
            </Card>
            <div className={classes.wrapper}>
                <div className={classes.navBar}>
                    {settingsConfig.map((setting, index) => {
                        return (
                            <NavLink
                                key={`setting/${index}`}
                                className={classes.navItem}
                                to={setting.path}
                                style={location.pathname === setting.path ? selectedStyle : {}}>
                                <Icon size={25} className={classes.icon}>
                                    {setting.icon}
                                </Icon>
                                <div className={classes.navTitle}>
                                    <SmallTitle>{setting.title}</SmallTitle>
                                    <Text>{setting.description}</Text>
                                </div>
                                <IconButton>
                                    <Icon>Right</Icon>
                                </IconButton>
                            </NavLink>
                        );
                    })}
                </div>
                <Card className={classes.main}>{children}</Card>
            </div>
        </div>
    );
};

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
                            <LayoutConfig classes={classes}>{children}</LayoutConfig>
                        </div>
                    </div>
                </MediaQuery>
                <MediaQuery query={`(max-width: ${mediaQuerySizeXs}px)`}>
                    <div className={classes.drawerSmall}>
                        <Header />
                        <div className={classes.drawerWrapper} id="dashboard">
                            <LayoutConfig classes={classes}>{children}</LayoutConfig>
                        </div>
                    </div>
                </MediaQuery>
            </Suspense>
        </Fragment>
    );
};

export default withStyles(style)(Layout);
