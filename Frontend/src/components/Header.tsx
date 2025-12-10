import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import blackLogo from "../assets/black-logo.svg";
import NavMenu from "./NavMenu";
import { Button } from "./ui";
import { useAuthStore } from "@/stores/authStore";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="bg-stone-100 w-full h-16 fixed top-0 flex justify-between lg:items-center border-b border-stone-300 z-1000">
      <Link to="/">
        <img src={blackLogo} alt="black-logo" className="w-40 p-2 mt-1"></img>
      </Link>
      <NavMenu />
      <Button
        variant="primary"
        onClick={() => navigate(isAuthenticated ? "/myaccount" : "login")}
        className="hidden lg:block mr-4"
      >
        {isAuthenticated ? "My Account" : "Log In / Register"}
      </Button>
    </header>
  );
}

export default Header;
