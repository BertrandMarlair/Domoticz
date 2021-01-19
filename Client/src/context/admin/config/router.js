import {lazy} from "react";

const User = lazy(() => import("../users/Users"));

export const defaultRoute = "/admin/users";
export const name = "User";
export const slug = "user";

const dashboardRoutes = [
    {
        path: "/admin/users",
        name: "Users",
        component: User,
        exact: true,
    },
];

export default dashboardRoutes;
