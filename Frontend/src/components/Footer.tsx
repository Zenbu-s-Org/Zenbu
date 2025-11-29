import redLogo from "../assets/red-logo.svg"

function Footer() {
  return (
    <footer className="bg-stone-900 w-full font-['Bricolage_Grotesque'] px-6 lg:px-30 py-4 lg:py-10 mt-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:mb-20 lg:gap-40">
            
            <div className="lg:w-2/5">
                <img src={redLogo} alt="red-logo" className="w-44 mt-10 mb-4"></img>
                <p className="text-stone-300">Select from fragrant rice or noodles, add your choice of protein, choose from our authentic thai sauces, and finish with crispy vegetables and herbs.</p>
            </div>

            <div className="lg:flex lg:justify-between lg:w-2/5 lg:gap-4 text-stone-300 my-10">
                <div>
                    <h3 className="uppercase underline text-2xl mb-2">Contact</h3>
                    <p>Opening hours</p>
                    <p>Sun-Wed: 11:00am - 20:00pm</p>
                    <p className="mb-8">Thurs-Sat: 10:00am - 22:00pm</p>
                </div>
                <div>
                    <h3 className="uppercase underline text-2xl mb-2">Socials</h3>
                    <p>test</p>
                </div>
            </div>
        </div>

        <hr className="text-stone-700"></hr>
        <p className="text-stone-300 mt-4 pl-2">© 2025 Zenbu</p>
    </footer>
  )
}

export default Footer