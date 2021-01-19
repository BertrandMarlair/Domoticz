import React from "react";
import {useSelector} from "react-redux";

const Connected = ({children, unConnected = false}) => {
    const connect = useSelector((state) => state.connected);
    const {connected} = connect;

    if (connected !== unConnected) {
        return children;
    }
    return <></>;
};

export default Connected;
