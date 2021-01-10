import {lazy} from "react";

const Application = lazy(() => import("../application/Application"));
const Test = lazy(() => import("../test/Test"));

export const defaultRoute = "/app/application";
export const name = "App";
export const slug = "app";

const dashboardRoutes = [
    {
        path: "/app/application",
        name: "Application",
        component: Application,
        exact: true,
        breadCrumbs: [{name: "Application", url: "/app/application"}],
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
