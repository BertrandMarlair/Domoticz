import {lazy} from "react";

const Provider = lazy(() => import("../providers/Providers"));
const PhilipsHue = lazy(() => import("../philipsHue/PhilipsHue"));
const PhilipsHueRoom = lazy(() => import("../philipsHue/pages/room/PhilipsHueRoom"));
const PhilipsHueLight = lazy(() => import("../philipsHue/pages/light/PhilipsHueLight"));
const PhilipsHueBridge = lazy(() => import("../philipsHue/pages/bridge/PhilipsHueBridge"));

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
        path: "/provider/philips_hue/bridge",
        name: "PhilipsHueBridge",
        component: PhilipsHueBridge,
        exact: true,
    },
    {
        path: "/provider/philips_hue/room",
        name: "PhilipsHueRoom",
        component: PhilipsHueRoom,
        exact: true,
    },
    {
        path: "/provider/philips_hue/light",
        name: "PhilipsHueLight",
        component: PhilipsHueLight,
        exact: true,
    },
];

export default dashboardRoutes;
