/* eslint-disable no-prototype-builtins */
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles, useTheme} from "@material-ui/core";
import Text from "../typography/Text";
import Badge from "../badge/Badge";
import style from "./TabsStyle";
import classNames from "classnames";
import Loading from "../loading/Loading";

const SimpleTabs = ({classes, tabs, tabClasses, children, className, fullWidth, ...props}) => {
    const theme = useTheme();

    const tabStyle = classNames({
        [className]: className,
        [classes.root]: true,
    });

    const wrapperStyle = classNames({
        [classes.wrapper]: true,
        [classes.fullWidth]: fullWidth,
    });

    return (
        <div className={tabStyle}>
            {tabs && (
                <StyledTabs {...props} variant="scrollable">
                    {tabs.map((tab) => (
                        <StyledTab
                            key={tab.label}
                            disableRipple={true}
                            {...tab}
                            loading="false"
                            classes={tabClasses}
                            label={
                                <div className={wrapperStyle}>
                                    <Text bold color="inherit">
                                        {tab.label}
                                    </Text>
                                    {tab.hasOwnProperty("badge") ? (
                                        <Badge marginLeft color={theme.palette.secondary.main}>
                                            {tab.badge >= 0 ? tab.badge : <Loading small />}
                                        </Badge>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            }
                        />
                    ))}
                </StyledTabs>
            )}
            <div className={wrapperStyle}>{children}</div>
        </div>
    );
};

export default withStyles(style)(SimpleTabs);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        minWidth: 50,
        color: theme.palette.text.light,
        transition: "0.1s",
        padding: "0 15px",
        "&:focus": {
            opacity: 1,
        },
    },
    selected: {
        color: theme.palette.white.main,
    },
}))((props) => <Tab {...props} />);

const StyledTabs = withStyles((theme) => ({
    root: {
        height: 30,
        color: theme.palette.white.main,
    },
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            maxWidth: 20,
            width: "100%",
            backgroundColor: theme.palette.primary.main,
        },
    },
}))((props) => <Tabs {...props} TabIndicatorProps={{children: <span />}} />);
