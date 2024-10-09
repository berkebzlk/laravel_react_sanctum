import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'

import ProtectedRoute from './components/auth/ProtectedRoute'

import registerRoutes from './pages/register/routes';
import loginRoutes from './pages/login/routes';

import {
  createBrowserRouter,
  NavLink,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import AppLayout from './components/layouts/AppLayout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <div>Hello world!</div>,
        errorElement: <div>Error!</div>,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute>
          <div>Dashboard!</div>
        </ProtectedRoute>,
      },
      {
        path: "/deneme",
        element: <div>
          <NavLink to="/dashboard">
            dashboarda giderr
          </NavLink>
        </div>,
      },
    ]
  },
  ...registerRoutes,
  ...loginRoutes
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
)
