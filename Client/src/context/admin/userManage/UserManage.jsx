import React from "react";
import {IconButton, withStyles} from "@material-ui/core";
// import {useTheme} from "@material-ui/styles";
import style from "./UserManageStyle";
import GoBack from "../../../components/goBack/GoBack";
import Icon from "../../../components/icon/Icon";
import SmallTitle from "../../../components/typography/SmallTitle";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

const UserManage = ({...props}) => {
    const {classes, children, userId} = props;

    const config = [
        {
            icon: "Account",
            title: "Profile",
            path: `/admin/user/${userId}`,
        },
        {
            icon: "Account",
            title: "Permissions",
            path: `/admin/user/${userId}/permissions`,
        },
    ];

    return (
        <div className={classes.root}>
            <GoBack />
            <div className={classes.wrapper}>
                <div className={classes.navBar}>
                    {config.map((item, index) => {
                        return (
                            <NavLink
                                key={`setting/${index}`}
                                className={
                                    location.pathname === item.path
                                        ? classNames(classes.navItem, classes.navItemActive)
                                        : classes.navItem
                                }
                                to={item.path}>
                                <Icon size={25} className={classes.icon}>
                                    {item.icon}
                                </Icon>
                                <div className="navTitle">
                                    <SmallTitle>{item.title}</SmallTitle>
                                </div>
                                <IconButton>
                                    <Icon>Right</Icon>
                                </IconButton>
                            </NavLink>
                        );
                    })}
                </div>
                <div className={classes.main}>{children}</div>
            </div>
        </div>
    );
};

export default withStyles(style)(UserManage);
