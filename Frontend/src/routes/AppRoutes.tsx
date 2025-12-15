import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import UserDashboard from "@/features/dashboard/UserDashboard";
import {
  HomePage,
  MenuPage,
  OrderPage,
  LoginPage,
  RegisterPage,
} from "@/pages";
import {
  AdminLayout,
  AdminInventoryPage,
  AdminMenuPage,
  AdminOrdersPage,
  AdminRoute,
} from "@/features/admin";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/order", element: <OrderPage /> },
      { path: "/contact", element: <div>contact</div> },
      { path: "/about", element: <div>about</div> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/Myaccount", element: <UserDashboard /> },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <h1>Welcome to Zenbu Dashboard</h1> },
          { path: "/admin/orders", element: <AdminOrdersPage /> },
          { path: "/admin/menu", element: <AdminMenuPage /> },
          { path: "/admin/inventory", element: <AdminInventoryPage /> },
        ],
      },
    ],
  },
]);

export default router;
