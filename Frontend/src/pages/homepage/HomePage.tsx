import { Label } from "../../components/ui"
import { Button }from "../../components/ui"
import Banner from "./components/Banner"

import heroImg from "../../assets/hero (1).png"
import heroImg1 from "../../assets/hero.png"
import waffle from "../../assets/Group.svg"
import SignatureBowls from "./components/SignatureBowls"
import TheProcess from "./components/TheProcess"
function HomePage() {
  return (
    <main>
      <section className='mt-15 flex flex-row justify-between'>
      <section className="pl-4">
        <Label className="text-[11px] text-center rotate-4 mb-4" variant="green">
          BETTER FOOD, LESS NOICE
        </Label>
        <div className='text-[40px] font-[Bricolage_Grotesque] tracking-tighter leading-10 font-extrabold mt-1' >
          <h1>CRAFT YOUR</h1>
          <h1 className='text-[#EA580C]'>PERFECT</h1>
          <h1 className='text-[#FB923C]'>BOWL</h1>
        </div>
        <p className='max-w-[170px] text-[12px] font-[Nunito]'>Try out our newest concept, craft your own bowl! It will blow your mind. From only 149kr</p>
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
     <Button className="text-[18px]" variant="primary">
      Build your own bowl
     </Button>
     <Button className="text-[18px]" variant="outline">
      View
     </Button>
     </div>

      <Banner/>

      <TheProcess/>

      <SignatureBowls/>
      
    </main>
  )
}

export default HomePage