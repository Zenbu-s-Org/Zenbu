import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/layouts/MainLayout"

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {path: "/", element: <div>home</div>}
        ]
    },
        {
        element: <MainLayout />,
        children: [
            {path: "/menu", element: <div>menu</div>}
        ]
    },
            {
        element: <MainLayout />,
        children: [
            {path: "/order", element: <div>order</div>}
        ]
    },
                {
        element: <MainLayout />,
        children: [
            {path: "/contact", element: <div>contact</div>}
        ]
    },
                {
        element: <MainLayout />,
        children: [
            {path: "/about", element: <div>about</div>}
        ]
    },
                {
        element: <MainLayout />,
        children: [
            {path: "/signin", element: <div>sign in</div>}
        ]
    },
                {
        element: <MainLayout />,
        children: [
            {path: "/register", element: <div>register</div>}
        ]
    }
    
])

export default router