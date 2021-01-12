import {lazy} from "react";

const Home = lazy(() => import("../home/Home"));

export const defaultRoute = "/app/home";
export const name = "App";
export const slug = "app";

const dashboardRoutes = [
    {
        path: "/app/home",
        name: "Home",
        component: Home,
        exact: true,
    },
];

export default dashboardRoutes;
