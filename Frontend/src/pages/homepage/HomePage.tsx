import { Label } from "../../components/ui"
import { Button }from "../../components/ui"
import Banner from "./components/Banner"
import ConfirmationBanner from "@/features/orderconfirmation/ConfirmationBanner"
import heroImg from "../../assets/hero (1).png"
import heroImg1 from "../../assets/hero.png"
import waffle from "../../assets/Group.svg"
import SignatureBowls from "./components/SignatureBowls"
import TheProcess from "./components/TheProcess"
import { Link } from "react-router-dom"

function HomePage() {
  return (
    <main>
      <ConfirmationBanner/>
      <section className='mt-15 flex flex-row justify-between'>
      <section className="pl-4">
        <Label className="rotate-4 mb-4 text-sm" variant="green">
          BETTER FOOD, LESS NOICE
        </Label>
        <div className='text-5xl tracking-tighter leading-10 font-extrabold mt-1' >
          <h1>CRAFT YOUR</h1>
          <h1 className='text-orange-600'>PERFECT</h1>
          <h1 className='text-orange-400'>BOWL</h1>
        </div>
        <p className='max-w-[170px] '>Try out our newest concept, craft your own bowl! It will blow your mind. From only 149kr</p>
      </section>
      <div className='absolute right-4 px-3'>
      <div className='relative w-[170px] h-[260px] mt-20 -z-24'>
        <img className='w-[191px] absolute bottom-15 left-0 -z-10' src={waffle} alt="" />
        <img className='w-[145px] absolute top-0  z-4' src={heroImg1} alt="" />
        <img className='w-[145px] absolute top-25 left-7  z-3'src={heroImg} alt="" />
      </div>
      </div>
      </section>
      <div className="flex flex-col gap-5 px-4 mt-35">
      <Link to="/menu" className="w-full">
        <Button className="w-full" variant="primary">
          View Our Menu
        </Button>
     </Link>
     {/* <Button className="text-[18px]" variant="outline">
      View
     </Button> */}
     </div>

      <Banner/>

      <TheProcess/>

      <SignatureBowls/>
      
    </main>
  )
}

export default HomePage