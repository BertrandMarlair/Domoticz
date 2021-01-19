import React, {Fragment, useEffect, useCallback, useState} from "react";
import gql from "graphql-tag";
import {useQuery} from "react-apollo";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";

import Error from "../../../components/error/Error";
import {MenuList, MenuItem, Divider} from "@material-ui/core";
import Avatar from "../../../components/avatar/Avatar";
import Icon from "../../../components/icon/Icon";
import Popper from "../../../components/popper/Popper";
import Loading from "../../../components/loading/Loading";
import SmallTitle from "../../../components/typography/SmallTitle";
import {LOGOUT, UPDATE_USER_INFO} from "../../../core/reducers/connectConfig";

const ProfileOptions = ({classes, handleCloseAvatar, handleClickAvatar, anchorElAvatar, history}) => {
    const [user, setUser] = useState({});
    const [updated, setUpdated] = useState(false);
    const {data, error} = useQuery(GET_CURRENT_USER);
    const {isDarkMode} = useSelector((state) => state.darkMode);

    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const logout = () => dispatch({type: LOGOUT});
    const toggleDarkMode = () => dispatch({type: "Layout/TOGGLE_DARKMODE"});

    const updateUserInfo = useCallback(
        (payload) => {
            dispatch({type: UPDATE_USER_INFO, payload});
        },
        [dispatch],
    );

    const logoutProfile = () => {
        logout();
        history.push("/connect/login");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        if (data && data.getCurrentUser) {
            setUser(data.getCurrentUser);
            if (!updated) {
                setUpdated(true);
                updateUserInfo(data.getCurrentUser);
            }
        }
    }, [data, updateUserInfo, updated]);

    if (!updated) {
        return <Loading small />;
    }

    return (
        <Fragment>
            <div className={classes.options}>
                <Error errorMessage={error} />
                <div className={classes.optionItemSmall} onClick={handleClickAvatar}>
                    <Avatar disableLink disableTooltip user={user} />
                </div>
            </div>
            <Popper placement={"top"} anchorEl={anchorElAvatar} handleClose={handleCloseAvatar}>
                <MenuList>
                    <MenuItem className={classes.optionMenuItem} onClick={() => toggleDarkMode()}>
                        <Icon className={classes.iconRight}>Light</Icon>
                        <SmallTitle light>
                            {t("header.settings.theme")}:{" "}
                            {isDarkMode ? t("header.settings.enable") : t("header.settings.disable")}
                        </SmallTitle>
                    </MenuItem>
                    <Divider />
                    <div>
                        <div className={classes.menuItemSubOptionsTitle}>
                            <Icon className={classes.iconCenter}>Translate</Icon>
                            <SmallTitle>{t("header.settings.language")}</SmallTitle>
                        </div>
                        <div className={classes.menuItemSubOptions}>
                            <MenuItem onClick={() => changeLanguage("en")}>
                                <SmallTitle light={i18n.language !== "en"} bold={i18n.language === "en"}>
                                    {t("header.settings.en")}
                                </SmallTitle>
                            </MenuItem>
                            <MenuItem onClick={() => changeLanguage("fr")}>
                                <SmallTitle light={i18n.language !== "fr"} bold={i18n.language === "fr"}>
                                    {t("header.settings.fr")}
                                </SmallTitle>
                            </MenuItem>
                        </div>
                    </div>
                    <MenuItem onClick={() => logoutProfile()}>
                        <SmallTitle light>{t("header.avatar.logout")}</SmallTitle>
                    </MenuItem>
                </MenuList>
            </Popper>
        </Fragment>
    );
};

export default withRouter(ProfileOptions);

const GET_CURRENT_USER = gql`
    query getCurrentUser {
        getCurrentUser {
            _id
            name
        }
    }
`;
