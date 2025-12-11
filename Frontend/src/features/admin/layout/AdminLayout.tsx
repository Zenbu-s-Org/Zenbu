import AdminHeader from "../components/AdminHeader";
import { Outlet } from "react-router-dom";
import { Modal } from "@/components/modal";

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main className="">
        <Outlet />
        <Modal />
      </main>
    </>
  );
}

export default AdminLayout;
