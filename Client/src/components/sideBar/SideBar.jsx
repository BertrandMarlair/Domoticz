import React, {useMemo, useState, useEffect} from "react";
import {withStyles} from "@material-ui/styles";
import style from "./SideBarStyle";
import PropTypes from "prop-types";
import {mediaQuerySizeXxs, widthSideBar} from "../../core/style/constant";
import Icon from "../icon/Icon";
import {NavLink, useRouteMatch} from "react-router-dom";
import {ClickAwayListener, useTheme} from "@material-ui/core";
import ProfileOptions from "./components/ProfileOptions";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";

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
    const dispatch = useDispatch();
    const layoutGlobal = useSelector((state) => state.layout);
    const {isSidebarOpened} = layoutGlobal;

    const [sideBarOpened, setSideBarOpended] = useState(isSidebarOpened);

    useEffect(() => {
        setTimeout(() => {
            setSideBarOpended(isSidebarOpened);
        }, 100);
    }, [isSidebarOpened]);

    const isMobile = useMediaQuery({
        query: `(max-width: ${mediaQuerySizeXxs}px)`,
    });

    const handleCloseSideBar = () => dispatch({type: "Layout/CLOSE_SIDEBAR"});

    const getSideBarSize = () => {
        if (isSidebarOpened) {
            return true;
        } else if (isMobile) {
            return false;
        }

        return true;
    };

    const [anchorElAvatar, setAnchorElAvatar] = useState(null);

    const handleClickAvatar = (event) => {
        setAnchorElAvatar(event.currentTarget);
    };

    const handleCloseAvatar = () => {
        setAnchorElAvatar(null);
    };

    const menu = {
        header: [
            {icon: "Home", link: "/app/home"},
            {icon: "Menu", link: "/applications/menu"},
            {icon: "Shuffle", link: "/stage/shuffle"},
        ],
        footer: [
            {icon: "SmartHome", link: "/provider/providers"},
            {icon: "Setting", link: "/settings/settings"},
            {icon: "Verified", link: "/admin/accounts"},
        ],
    };

    const currentUrl = (link) => {
        if (
            match.url.split("/")[1] === link.split("/")[1] ||
            window.location.pathname.split("/")[1] === link.split("/")[1]
        ) {
            return true;
        }
        return false;
    };

    const handleClickAway = () => {
        if (sideBarOpened) {
            handleCloseSideBar();
        }
    };

    return (
        <ClickAwayListener onClickAway={() => handleClickAway()}>
            <div className={classes.root} style={{marginLeft: getSideBarSize() ? 0 : `-${widthSideBar}px`}}>
                <NavLink className={classes.logo} to={`/app/home`}>
                    <div className={classes.optionItem}>
                        <img src="/assets/logos/smart.png" alt="logo" className={classes.img} />
                    </div>
                </NavLink>
                <div className={classes.content}>
                    <div className={classes.contentHeader}>
                        {menu.header.map((item, i) => {
                            return (
                                <NavLink
                                    to={item.link}
                                    key={`sideBarItem/${i}`}
                                    className={classes.menuItem}
                                    onClick={() => handleCloseSideBar()}>
                                    <div
                                        className={classes.target}
                                        style={{
                                            background: currentUrl(item.link)
                                                ? theme.palette.primary.main
                                                : "transparent",
                                            boxShadow:
                                                currentUrl(item.link) &&
                                                `1px 0px 11px ${theme.palette.primary.light}90`,
                                        }}></div>
                                    <div className={classes.icon}>
                                        <Icon
                                            size={22}
                                            color={
                                                currentUrl(item.link)
                                                    ? theme.palette.primary.light
                                                    : theme.palette.grey.primary
                                            }>
                                            {item.icon}
                                        </Icon>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                    <div className={classes.contentFooter}>
                        {menu.footer.map((item, i) => {
                            return (
                                <NavLink
                                    to={item.link}
                                    key={`sideBarItem/${i}`}
                                    className={classes.menuItem}
                                    onClick={() => handleCloseSideBar()}>
                                    <div
                                        className={classes.target}
                                        style={{
                                            background: currentUrl(item.link)
                                                ? theme.palette.primary.main
                                                : "transparent",
                                            boxShadow:
                                                currentUrl(item.link) &&
                                                `1px 0px 11px ${theme.palette.primary.light}90`,
                                        }}></div>
                                    <div className={classes.icon}>
                                        <Icon
                                            size={22}
                                            color={
                                                currentUrl(item.link)
                                                    ? theme.palette.primary.light
                                                    : theme.palette.grey.primary
                                            }>
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
        </ClickAwayListener>
    );
};

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(SideBarProvider);
