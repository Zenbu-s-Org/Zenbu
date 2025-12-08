import { Button } from "@/components/ui"
import blackLogo from "@/assets/black-logo.svg"
import { Link} from "react-router-dom"
import AdminNavLink from "./AdminNavLink"


function AdminHeader() {

   

  return (
    <header className="flex flex-col py-4">
        <div className="flex justify-between px-3 pb-5 border-b-2 border-b-stone-300">
            <img src={blackLogo} alt="zenbu logo" className="w-40"/> 
            <Link to="">
            <Button variant="link">Sign Out</Button>
            </Link>
        </div>
        <nav className="w-full border-b-3 border-stone-600 text-lg font-semibold flex justify-around">
            <AdminNavLink to="/admin/orders">Orders</AdminNavLink>
            <AdminNavLink to="/admin/menu">Menu</AdminNavLink>
            <AdminNavLink to="/admin/inventory">Inventory</AdminNavLink>
        </nav>
    </header>
  )
}

export default AdminHeader