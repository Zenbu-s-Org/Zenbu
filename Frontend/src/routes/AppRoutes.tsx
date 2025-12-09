import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import MenuPage from "@/pages/MenuPage"
import OrderPage from "@/pages/OrderPage"
import HomePage from "@/pages/homepage/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import UserDashboard from "@/features/dashboard/UserDashboard"

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
            {path: "/register", element: <RegisterPage />},
            {path: "/dashboard", element: <UserDashboard />}
        ]
    }
])

export default router