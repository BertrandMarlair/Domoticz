import React, {useMemo, useState} from "react";
import {withStyles} from "@material-ui/styles";
import style from "./SideBarStyle";
import PropTypes from "prop-types";
import {widthSideBar} from "../../core/style/constant";
import Icon from "../icon/Icon";
import {NavLink, useRouteMatch} from "react-router-dom";
import {useTheme} from "@material-ui/core";
import ProfileOptions from "./components/ProfileOptions";

const SideBarProvider = ({menu, classes}) => {
    const match = useRouteMatch();
    const theme = useTheme();

    const Provider = useMemo(() => {
        return <SideBar menu={menu} classes={classes} match={match} />;
        // eslint-disable-next-line
    }, [menu, match, theme]);

    return Provider;
};

const SideBar = ({classes, match}) => {
    const theme = useTheme();
    const [anchorElAvatar, setAnchorElAvatar] = useState(null);

    const handleClickAvatar = (event) => {
        console.log(event);
        setAnchorElAvatar(event.currentTarget);
    };

    const handleCloseAvatar = () => {
        setAnchorElAvatar(null);
    };

    const menu = {
        header: [
            {icon: "Home", link: "/app/home"},
            {icon: "Menu", link: "/app/menu"},
            {icon: "Shuffle", link: "/app/shuffle"},
        ],
        footer: [
            {icon: "Add", link: "/add/provider"},
            {icon: "Setting", link: "/app/settings"},
            {icon: "Verified", link: "/app/admin"},
        ],
    };

    return (
        <div className={classes.root} style={{width: widthSideBar}}>
            <NavLink className={classes.logo} to={`/app/home`}>
                <div className={classes.optionItem}>
                    <img src="/assets/logos/smart.png" alt="logo" className={classes.img} />
                </div>
            </NavLink>
            <div className={classes.content}>
                <div className={classes.contentHeader}>
                    {menu.header.map((item, i) => {
                        const currentUrl = match.url === item.link || window.location.pathname === item.link;

                        return (
                            <NavLink to={item.link} key={`sideBarItem/${i}`} className={classes.menuItem}>
                                <div
                                    className={classes.target}
                                    style={{
                                        background: currentUrl ? theme.palette.primary.main : "transparent",
                                        boxShadow: currentUrl && `1px 0px 11px ${theme.palette.primary.light}90`,
                                    }}></div>
                                <div className={classes.icon}>
                                    <Icon
                                        size={22}
                                        color={currentUrl ? theme.palette.primary.light : theme.palette.grey.primary}>
                                        {item.icon}
                                    </Icon>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
                <div className={classes.contentFooter}>
                    {menu.footer.map((item, i) => {
                        const currentUrl = match.url === item.link || window.location.pathname === item.link;

                        return (
                            <NavLink to={item.link} key={`sideBarItem/${i}`} className={classes.menuItem}>
                                <div
                                    className={classes.target}
                                    style={{
                                        background: currentUrl ? theme.palette.primary.main : "transparent",
                                        boxShadow: currentUrl && `1px 0px 11px ${theme.palette.primary.light}90`,
                                    }}></div>
                                <div className={classes.icon}>
                                    <Icon
                                        size={22}
                                        color={currentUrl ? theme.palette.primary.light : theme.palette.grey.primary}>
                                        {item.icon}
                                    </Icon>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
            <ProfileOptions
                classes={classes}
                handleCloseAvatar={handleCloseAvatar}
                handleClickAvatar={handleClickAvatar}
                anchorElAvatar={anchorElAvatar}
            />
        </div>
    );
};

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(SideBarProvider);
