import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import AdminLayout from "@/layouts/AdminLayout"
import MenuPage from "@/pages/MenuPage"
import OrderPage from "@/pages/OrderPage"
import HomePage from "@/pages/homepage/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/menu", element: <MenuPage />},
            {path: "/order", element: <OrderPage />},
            {path: "/contact", element: <div>contact</div>},
            {path: "/about", element: <div>about</div>},
            {path: "/login", element: <LoginPage />},
            {path: "/register", element: <RegisterPage />}
        ]
    },
    {
    path: "/admin",               
    element: <AdminLayout />,
    children: [
      { index: true, element: <h1>Dashboard</h1> },   
      { path: "orders", element: <h1>Orders</h1> },   
      { path: "menu", element: <h1>Menu</h1> },      
      { path: "inventory", element: <h1>Inventory</h1> }, 
    ],
  },
])

export default router