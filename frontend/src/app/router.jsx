import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx'
import LoginPage from '../pages/auth/LoginPage.jsx'
import HomePage from '../pages/home/HomePage.jsx'
import ProtectedRoute from '../routes/ProtectedRoute.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'admin/login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'admin',
            element: <AdminDashboardPage />,
          },
        ],
      },
    ],
  },
])
