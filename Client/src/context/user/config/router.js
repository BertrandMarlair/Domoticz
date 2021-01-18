import {lazy} from "react";

const User = lazy(() => import("../users/Users"));

export const defaultRoute = "/user/users";
export const name = "User";
export const slug = "user";

const dashboardRoutes = [
    {
        path: "/user/users",
        name: "Users",
        component: User,
        exact: true,
    },
];

export default dashboardRoutes;
