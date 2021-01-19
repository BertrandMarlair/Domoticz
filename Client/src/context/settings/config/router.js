import {lazy} from "react";

const Account = lazy(() => import("../account/Account"));
const Weather = lazy(() => import("../weather/Weather"));

export const defaultRoute = "/settings/account";
export const name = "Account";
export const slug = "settings";

const dashboardRoutes = [
    {
        path: "/settings/account",
        name: "Account",
        component: Account,
        exact: true,
    },
    {
        path: "/settings/weather",
        name: "Weather",
        component: Weather,
        exact: true,
    },
];

export default dashboardRoutes;
