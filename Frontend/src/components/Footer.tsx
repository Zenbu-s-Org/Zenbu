import redLogo from "../assets/red-logo.svg";
import { Instagram, Facebook } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-auto w-full bg-stone-900 px-6 py-4 font-['Bricolage_Grotesque'] lg:px-30 lg:py-10">
      <div className="flex flex-col lg:mb-20 lg:flex-row lg:justify-between lg:gap-40">
        <div className="lg:w-2/5">
          <img src={redLogo} alt="red-logo" className="mt-10 mb-4 w-44"></img>
          <p className="text-stone-300">
            Select from fragrant rice or noodles, add your choice of protein,
            choose from our authentic thai sauces, and finish with crispy
            vegetables and herbs.
          </p>
        </div>

        <div className="my-10 text-stone-300 lg:flex lg:w-2/5 lg:justify-between lg:gap-4">
          <div>
            <h3 className="mb-2 text-2xl uppercase underline">Contact</h3>
            <p>Opening hours</p>
            <p>Sun-Wed: 11:00am - 20:00pm</p>
            <p className="mb-8">Thurs-Sat: 10:00am - 22:00pm</p>
          </div>
          <div>
            <h3 className="mb-2 text-2xl uppercase underline">Socials</h3>
            <div className="flex gap-2">
              <Instagram />
              <Facebook />
            </div>
          </div>
        </div>
      </div>

      <hr className="text-stone-700"></hr>
      <p className="mt-4 pl-2 text-stone-300">© 2025 Zenbu</p>
    </footer>
  );
}

export default Footer;
