import {lazy} from "react";

const Provider = lazy(() => import("../providers/Providers"));
const PhilipsHue = lazy(() => import("../philipsHue/PhilipsHue"));
const PhilipsHueRoom = lazy(() => import("../philipsHue/pages/room/PhilipsHueRoom"));

export const defaultRoute = "/provider/providers";
export const name = "Provider";
export const slug = "provider";

const dashboardRoutes = [
    {
        path: "/provider/providers",
        name: "Provider",
        component: Provider,
        exact: true,
    },
    {
        path: "/provider/philips_hue",
        name: "PhilipsHue",
        component: PhilipsHue,
        exact: true,
    },
    {
        path: "/provider/philips_hue/room",
        name: "PhilipsHueRoom",
        component: PhilipsHueRoom,
        exact: true,
    },
];

export default dashboardRoutes;
