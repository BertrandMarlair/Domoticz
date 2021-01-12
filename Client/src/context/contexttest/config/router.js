import {lazy} from "react";

const Page = lazy(() => import("../page/Page"));
const CreateBlock = lazy(() => import("../createblock/CreateBlock"));

export const defaultRoute = "/contexttest/page";
export const name = "ContextTest";
export const slug = "contexttest";

const contexttestRoutes = [
    {
        path: "/contexttest/page",
        name: "Page",
        component: Page,
        exact: true,
    },
    {
        path: "/contexttest/createblock",
        name: "CreateBlock",
        component: CreateBlock,
        exact: true,
    },
];

export default contexttestRoutes;
