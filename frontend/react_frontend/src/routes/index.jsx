import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";

import ProtectedRoute from '../components/auth/ProtectedRoute'

import registerRoutes from '../pages/register/routes';
import loginRoutes from '../pages/login/routes';

import AppLayout from '../components/layouts/AppLayout.jsx';
import { Heading } from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <Heading>Hello world!</Heading>,
                errorElement: <Heading>Error!</Heading>,
            },
            {
                path: "/dashboard",
                element: <Heading>Dashboard!</Heading>
                ,
            },
            {
                path: "/deneme",
                element: <div>
                    <NavLink to="/dashboard">
                        dashboarda giderr
                    </NavLink>
                </div>,
            },
            {
                path: "/settings",
                element: <Heading as='h3'>Settings</Heading>
            },
            {
                path: "/folder",
                element: <Heading as='h3'>Folder</Heading>
            },
            {
                path: "/users",
                element: <Heading as='h3'>Users</Heading>
            },
            {
                path: "/tasks",
                element: <Heading as='h3'>Tasks</Heading>
            },
            {
                path: "/profile",
                element: <Heading as='h3'>Profile</Heading>
            },
        ]
    },
    ...registerRoutes,
    ...loginRoutes
]);

export default function Router() {
    return <RouterProvider router={router} />
}