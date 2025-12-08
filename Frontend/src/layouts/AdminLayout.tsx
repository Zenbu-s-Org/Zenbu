import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <>
    <Header />
    <main className="pt-16">
        <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default AdminLayout