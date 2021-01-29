/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {IconButton, withStyles} from "@material-ui/core";
import style from "./HomeStyle";
import Hours from "./components/hours/Hours";
import Thermostat from "./components/thermostat/Thermostat";
import Actions from "./components/actions/Actions";
import Tabs from "../../../components/tabs/Tabs";
import Icon from "../../../components/icon/Icon";
import Title from "../../../components/typography/Title";
import Text from "../../../components/typography/Text";
import Lights from "./components/lights/Lights";

const Home = ({classes}) => {
    const [indexContent, setIndexContent] = useState(0);

    const tabs = [
        {
            label: "Lights",
        },
        {
            label: "Temperature",
        },
        {
            label: "Sound",
        },
        {
            label: "Rooms",
        },
    ];

    const getTabs = () => {
        switch (indexContent) {
            case 0:
                return <Lights />;
            default:
                return <></>;
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.leftSidenav}>
                <Actions />
                <div className={classes.wrapperMain}>
                    <Hours />
                    <Thermostat />
                </div>
            </div>
            <div className={classes.rightSidenav}>
                <div className={classes.headerTabs}>
                    {/* <IconButton>
                        <Icon>Back</Icon>
                    </IconButton> */}
                    <div>
                        <Title className={classes.headerTitle}>Salon</Title>
                        <Text color="primary" className={classes.headerDevices}>
                            4 devices
                        </Text>
                    </div>
                    <div />
                </div>
                <Tabs
                    tabs={tabs}
                    value={indexContent}
                    onChange={(e, i) => setIndexContent(i)}
                    className={classes.tabsContainer}
                />
                {getTabs()}
            </div>
        </div>
    );
};

export default withStyles(style)(Home);
