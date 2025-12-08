import AdminHeader from "../components/AdminHeader"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <>
    <AdminHeader />
    <main className="pt-5 flex flex-col items-center">
        <Outlet />
    </main>
    </>
  )
}

export default AdminLayout