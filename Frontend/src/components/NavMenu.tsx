import { useState } from "react"
import { Link } from "react-router-dom";
import redLogo from "../assets/red-logo.svg"

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="relative z-50">

        {!isOpen && (
          <button className="absolute top-5 right-4 lg:hidden" onClick={() => setIsOpen(true)}>
            <div className="flex flex-col gap-2">
              <span className="block w-10 h-1 bg-stone-900 rounded-lg"></span>
              <span className="block w-10 h-1 bg-stone-900 rounded-lg"></span>
              <span className="block w-10 h-1 bg-stone-900 rounded-lg"></span>
            </div>
          </button>
        )}
        
        <div className={`flex flex-col fixed top-0 right-0 z-50 h-screen w-full bg-stone-900 font-['Archivo_Black'] text-stone-400 font-bold text-3xl transform transition-transform duration-300 ${ isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-5/6 items-center justify-center gap-8 relative">
            <button className="absolute top-8 right-6 text-red-500 text-lg" onClick={() => setIsOpen(false)}>
              close
            </button>
            
            <Link to="/menu" onClick={() => setIsOpen(false)}>Menu</Link>
            <Link to="/" onClick={() => setIsOpen(false)}>Create your bowl</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/signin" onClick={() => setIsOpen(false)}>Log In / Register</Link>
          </div>

          <div className="mt-auto pb-6 flex justify-center">
            <img src={redLogo} alt="red-logo" className="w-52"></img>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-12 font-bold text-stone-900 font-['Nunito'] text-xl">
          <Link to="/">Menu</Link>
          <Link to="/">Create your bowl</Link>
          <Link to="/">About us</Link>
          <Link to="/">Contact</Link>
        </div>
      </nav>
    </>
  )
}

export default NavMenu