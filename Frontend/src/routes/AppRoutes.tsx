import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"
import OrderPage from "@/pages/OrderPage"
import HomePage from "@/pages/homepage/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/menu", element: <div>menu</div>},
            {path: "/order", element: <OrderPage />},
            {path: "/contact", element: <div>contact</div>},
            {path: "/about", element: <div>about</div>},
            {path: "/login", element: <LoginPage />},
            {path: "/register", element: <RegisterPage />}
        ]
    }
])

export default router