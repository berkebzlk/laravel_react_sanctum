import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";

import ProtectedRoute from '../components/auth/ProtectedRoute'

import registerRoutes from '../pages/register/routes';
import loginRoutes from '../pages/login/routes';
import exampleTableRoutes from '../pages/exampleTable/routes';
import satisRoutes from '../pages/Satis/routes.jsx';
import stokRoutes from '../pages/Stok/routes.jsx';

import AppLayout from '../components/layouts/AppLayout.jsx';
import { Heading } from "@chakra-ui/react";
import { ErrorBoundary, fallbackRender } from "../components/error/ErrorBoundary.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
        <ErrorBoundary fallbackRender={fallbackRender}>
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        </ErrorBoundary>)
        ,
        children: [
            { path: "/", element: <Heading>ANA SAYFA</Heading> },
            { path: "/Panel/10", element: <Heading>2022 DASHBOARD</Heading> },
            { path: "/Panel/11", element: <Heading>2023 DASHBOARD</Heading> },
            { path: "/FaturaRapor", element: <Heading>Ülke Bazında Satış Raporu</Heading> },
            { path: "/AnalizAlFat", element: <Heading>Alış Analiz Listesi</Heading> },
            { path: "/AlisByUlke", element: <Heading>Ülke Bazında Alış Raporu</Heading> },
            { path: "/AlisFaturalariDetayli", element: <Heading>Alış Faturaları Detaylı Raporu</Heading> },
            { path: "/CariHareketFoylari", element: <Heading>Cari Ekstre Dökümü</Heading> },
            { path: "/AnalizProjeler2022", element: <Heading>Alış Satış Kar 2022</Heading> },
            { path: "/AnalizProjeler2023", element: <Heading>Alış Satış Kar 2023</Heading> },
            { path: "/AnalizProjeler2024", element: <Heading>Alış Satış Kar 2024</Heading> },
            { path: "/GenelAmacliAlisSatis", element: <Heading>Genel Amaçlı Alış Satış Raporu</Heading> },


            ...exampleTableRoutes,
            ...satisRoutes,
            ...stokRoutes
        ],
    },
    ...registerRoutes,
    ...loginRoutes,
]);

export default function Router() {
    return <RouterProvider router={router} />
}