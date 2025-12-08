import AdminHeader from "../components/AdminHeader"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <>
    <AdminHeader />
    <main className="">
        <Outlet />
    </main>
    </>
  )
}

export default AdminLayout