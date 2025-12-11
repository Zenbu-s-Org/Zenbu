import { Label } from "../../components/ui"
import { Button }from "../../components/ui"
import Banner from "./components/Banner"
import ConfirmationBanner from "@/features/orderconfirmation/ConfirmationBanner"
import landingpageImg from "../../assets/landingpage-img.svg"
import SignatureBowls from "./components/SignatureBowls"
import TheProcess from "./components/TheProcess"
import { useNavigate } from "react-router-dom"

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="bg-stone-100 pt-10 flex flex-col"> 
      <ConfirmationBanner/>
      <section className='px-4 lg:px-30 pt-10 flex flex-col sm:flex-row justify-between'>
        <div className="lg:flex-1 flex flex-col">
          <Label className="-rotate-4 mb-6 lg:mb-12 text-sm text-center w-60 lg:w-3/5 lg:text-base" variant="green">
            BETTER FOOD, LESS NOICE
          </Label>
          <div className='tracking-tighter leading-10 font-extrabold mt-1' >
            <h1 className="text-[60px] lg:text-8xl">CRAFT YOUR</h1>
            <h1 className='text-[60px] lg:text-8xl text-orange-600'>PERFECT</h1>
            <h1 className='text-[60px] lg:text-8xl text-orange-400'>BOWL</h1>
          </div>
          <p className="font-bold text-sm lg:text-lg w-5/6 lg:w-3/5">Try out our newest concept, craft your own bowl! It will blow your mind. From only 119kr.</p>
          
          <div className="flex flex-col gap-5 w-full px-4 mt-20 lg:mt-30 lg:mt-1 lg:mb-40 lg:flex-row">
            <Button variant="primary" onClick={() => navigate("/menu#buildbowl")}>
              Build Your Own Bowl
            </Button>
          
            <Button variant="outline" onClick={() => navigate("/menu")}>
              View Our Menu
            </Button>
          </div>

        </div>
        
        <div className='flex lg:flex-1 hidden sm:block'>
          <img className='w-full justify-center items-center pt-10' src={landingpageImg} alt="landingpage-img" />
        </div>
      </section>
      

      <Banner/>

      <TheProcess/>

      <SignatureBowls/>
      
    </main>
  )
}

export default HomePage