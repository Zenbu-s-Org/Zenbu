import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import redLogo from "../assets/red-logo.svg";
import { useAuthStore } from "@/stores/authStore";

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="relative z-50">
        {!isOpen && (
          <button
            className="absolute top-5 right-4 lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex flex-col gap-2">
              <span className="block h-1 w-10 rounded-lg bg-stone-900"></span>
              <span className="block h-1 w-10 rounded-lg bg-stone-900"></span>
              <span className="block h-1 w-10 rounded-lg bg-stone-900"></span>
            </div>
          </button>
        )}

        <div
          className={`fixed top-0 right-0 z-50 flex h-screen w-full transform flex-col bg-stone-900 font-['Archivo_Black'] text-3xl font-bold text-stone-400 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="relative flex h-5/6 flex-col items-center justify-center gap-8">
            <button
              className="absolute top-8 right-6 text-lg text-red-500"
              onClick={() => setIsOpen(false)}
            >
              close
            </button>

            <Link to="/menu" onClick={() => setIsOpen(false)}>
              Menu
            </Link>
            <Link to="/menu#buildbowl" onClick={() => setIsOpen(false)}>
              Build your own bowl
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About us
            </Link>
            <Link
              to={isAuthenticated ? "/myaccount" : "/login"}
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? "My Account" : "Sign In / Register"}
            </Link>
            {isAuthenticated && (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            )}
          </div>

          <div className="mt-auto flex justify-center pb-6">
            <img src={redLogo} alt="red-logo" className="w-52"></img>
          </div>
        </div>

        <div className="hidden lg:flex gap-12 font-bold text-stone-900 font-['Nunito'] text-xl">
          <Link to="/menu">Menu</Link>
          <Link to="/menu#buildbowl">Build your own bowl</Link>
          <Link to="/about">About us</Link>
        </div>
      </nav>
    </>
  );
}

export default NavMenu;
