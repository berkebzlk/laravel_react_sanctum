import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ProtectedRoute from './components/auth/ProtectedRoute'

import registerRoutes from './pages/register/routes';
import loginRoutes from './pages/login/routes';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <div>Error!</div>,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute>
      <div>Dashboard!</div>
    </ProtectedRoute>,
  },
  ...registerRoutes,
  ...loginRoutes
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
