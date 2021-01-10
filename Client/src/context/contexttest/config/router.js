import {lazy} from "react";

const Mypage = lazy(() => import("../page/Page"));

export const defaultRoute = "/contexttest/page";
export const name = "ContextTest";
export const slug = "contexttest";

const contexttestRoutes = [
    {
        path: "/contexttest/page",
        name: "Page",
        component: Mypage,
        exact: true,
    },
];

export default contexttestRoutes;
