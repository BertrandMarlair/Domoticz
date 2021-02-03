import React from "react";
import {withStyles} from "@material-ui/styles";
import style from "./HeaderStyle";
import {mediaQuerySizeXxs, widthSideBar} from "../../core/style/constant";
import Icon from "../icon/Icon";
import {IconButton} from "@material-ui/core";
import MediaQuery from "react-responsive";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";
import SmallTitle from "../typography/SmallTitle";

const Header = ({classes}) => {
    const dispatch = useDispatch();
    const layoutGlobal = useSelector((state) => state.layout);
    const {isSidebarOpened} = layoutGlobal;
    const isMobile = useMediaQuery({
        query: `(max-width: ${mediaQuerySizeXxs}px)`,
    });

    const getSideBarSize = () => {
        if (isSidebarOpened) {
            return true;
        } else if (isMobile) {
            return false;
        }

        return true;
    };

    const toggleMenu = () => dispatch({type: "Layout/TOGGLE_SIDEBAR"});

    return (
        <MediaQuery query={`(max-width: ${mediaQuerySizeXxs}px)`}>
            <div className={classes.root}>
                <div className={classes.header} style={{padding: !getSideBarSize() ? 0 : `0 ${widthSideBar}px`}}>
                    <IconButton onClick={() => toggleMenu()}>
                        <Icon>Menu</Icon>
                    </IconButton>
                    <SmallTitle small>Domoticz</SmallTitle>
                    <div className={classes.spacer} />
                </div>
            </div>
        </MediaQuery>
    );
};

export default withStyles(style)(Header);
