import {lazy} from "react";

const Account = lazy(() => import("../accounts/Accounts"));
const UserProfile = lazy(() => import("../userProfile/UserProfile"));
const UserPermissions = lazy(() => import("../userPermissions/UserPermissions"));
const DeviceProfile = lazy(() => import("../deviceProfile/DeviceProfile"));
const DeviceScenes = lazy(() => import("../deviceScenes/DeviceScenes"));

export const defaultRoute = "/admin/accounts";
export const name = "User";
export const slug = "user";

const dashboardRoutes = [
    {
        path: "/admin/accounts",
        name: "Account",
        component: Account,
        exact: true,
    },
    {
        path: "/admin/user/:userId",
        name: "UserProfile",
        component: UserProfile,
        exact: true,
    },
    {
        path: "/admin/user/:userId/permissions",
        name: "UserPermissions",
        component: UserPermissions,
        exact: true,
    },
    {
        path: "/admin/device/:deviceId",
        name: "DeviceProfile",
        component: DeviceProfile,
        exact: true,
    },
    {
        path: "/admin/device/:deviceId/scenes",
        name: "DeviceScenes",
        component: DeviceScenes,
        exact: true,
    },
];

export default dashboardRoutes;
