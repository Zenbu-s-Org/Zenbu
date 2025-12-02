import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import blackLogo from "../assets/black-logo.svg"
import NavMenu from "./NavMenu"
import { Button } from "./ui";

function Header() {
    const navigate = useNavigate();

  return (
    <header className="bg-stone-100 w-full h-16 fixed flex justify-between lg:items-center border-b-1 border-stone-300 z-1000">
        <Link to="/">
            <img src={blackLogo} alt="black-logo" className="w-40 p-2 mt-1"></img>
        </Link>
        <NavMenu />
        <Button variant="primary" onClick={() => navigate("/")} className="hidden lg:block mr-4">Log In / Register</Button>
    </header>
  )
}

export default Header