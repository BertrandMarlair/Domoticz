import {lazy} from "react";

const Provider = lazy(() => import("../provider/Provider"));

export const defaultRoute = "/add/provider";
export const name = "Provider";
export const slug = "provider";

const dashboardRoutes = [
    {
        path: "/add/provider",
        name: "Provider",
        component: Provider,
        exact: true,
    },
];

export default dashboardRoutes;
