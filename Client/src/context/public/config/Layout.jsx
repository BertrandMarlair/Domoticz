import React, {Fragment} from "react";
import Header from "../../../components/header/Header";

const Layout = (props) => (
    <Fragment>
        <Header />
        {props.children}
    </Fragment>
);

export default Layout;
