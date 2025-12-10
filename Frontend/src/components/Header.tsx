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
    <header className="fixed top-0 z-1000 flex h-16 w-full justify-between border-b border-stone-300 bg-stone-100 lg:items-center">
      <Link to="/">
        <img src={blackLogo} alt="black-logo" className="mt-1 w-40 p-2"></img>
      </Link>
      <NavMenu />
      <Button
        variant="primary"
        onClick={() => navigate(isAuthenticated ? "/myaccount" : "login")}
        className="mr-4 hidden lg:block"
      >
        {isAuthenticated ? "My Account" : "Log In / Register"}
      </Button>
    </header>
  );
}

export default Header;
