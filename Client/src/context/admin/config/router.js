import {lazy} from "react";

const User = lazy(() => import("../users/Users"));
const UserProfile = lazy(() => import("../userProfile/UserProfile"));
const UserPermissions = lazy(() => import("../userPermissions/UserPermissions"));
const DeviceProfile = lazy(() => import("../deviceProfile/DeviceProfile"));
const DeviceScenes = lazy(() => import("../deviceScenes/DeviceScenes"));

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
        path: "/admin/device/:userId",
        name: "DeviceProfile",
        component: DeviceProfile,
        exact: true,
    },
    {
        path: "/admin/device/:userId/scenes",
        name: "DeviceScenes",
        component: DeviceScenes,
        exact: true,
    },
];

export default dashboardRoutes;
