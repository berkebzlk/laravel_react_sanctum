import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import registerRoutes from './pages/register/routes';

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
    element: <div>Dashboard!</div>,
  },
  ...registerRoutes
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
