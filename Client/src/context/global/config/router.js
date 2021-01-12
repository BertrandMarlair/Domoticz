import {lazy} from "react";

const Home = lazy(() => import("../home/Home"));
const Test = lazy(() => import("../test/Test"));

export const defaultRoute = "/app/home";
export const name = "App";
export const slug = "app";

const dashboardRoutes = [
    {
        path: "/app/home",
        name: "Home",
        component: Home,
        exact: true,
        breadCrumbs: [{name: "Home", url: "/app/home"}],
    },
    {
        path: "/app/test",
        name: "Test",
        component: Test,
        exact: true,
        breadCrumbs: [{name: "Test", url: "/test/test"}],
    },
];

export default dashboardRoutes;
