import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core";
import style from "./HoursStyle";
import Title from "../../../../../components/typography/Title";

const Hours = ({classes}) => {
    const [today, setDate] = useState(new Date());

    const locale = "fr";

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 60 * 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const day = today.toLocaleDateString(locale, {weekday: "long"});
    const date = `${day.slice(0, 1).toUpperCase()}${day.slice(1)}, ${today.getDate()} ${today.toLocaleDateString(
        locale,
        {month: "long"},
    )}`;
    const hour = today.getHours();
    const minutes = today.getMinutes();

    return (
        <div className={classes.root}>
            <div className={classes.bar} />
            <div className={classes.time}>
                <Title className={classes.date}>{date}</Title>
                <div className={classes.times}>
                    <Title className={classes.hours}>
                        {hour < 10 && 0}
                        {hour}:
                    </Title>
                    <Title className={classes.minutes}>
                        {minutes < 10 && 0}
                        {minutes}
                    </Title>
                </div>
            </div>
        </div>
    );
};

export default withStyles(style)(Hours);
