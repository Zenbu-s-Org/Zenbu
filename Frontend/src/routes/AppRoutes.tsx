import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import MenuPage from "@/pages/MenuPage";
import OrderPage from "@/pages/OrderPage";
import HomePage from "@/pages/homepage/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import UserDashboard from "@/features/dashboard/UserDashboard";

import { AdminLayout } from "@/features/admin";
import {
  AdminMenuPage,
  AdminInventoryPage,
  AdminOrdersPage,
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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <h1 className="text-2xl">Welcome to zenbu dashboard</h1>
          </>
        ),
      },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "menu", element: <AdminMenuPage /> },
      { path: "inventory", element: <AdminInventoryPage /> },
    ],
  },
]);

export default router;
