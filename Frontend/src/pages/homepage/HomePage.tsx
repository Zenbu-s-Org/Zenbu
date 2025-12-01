import { Label } from "../../components/ui"
import { Button }from "../../components/ui"
import Banner from "./components/Banner"
import TheProcess from "./components/TheProcess"
function HomePage() {
  return (
    <main>
      <section className='mt-20 flex flex-row justify-between'>
      <section className="pl-4">
        <Label className="text-[11px] text-center rotate-4" variant="green">
          BETTER FOOD, LESS NOICE
        </Label>
        <div className='text-[40px] font-extrabold' >
          <h1>CRAFT YOUR</h1>
          <h1 className='text-[#EA580C]'>PERFECT</h1>
          <h1 className='text-[#FB923C]'>BOWL</h1>
        </div>
        <p className='max-w-[170px] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
      </section>
      <div className='absolute right-0 px-3'>
      <div className='relative w-[170px] h-[260px] mt-25 -z-24'>
        <img className='w-[191px] absolute bottom-15 left-0 -z-10' src="/Group.svg" alt="" />
        <img className='w-[145px] absolute top-0  z-4' src="/hero.png" alt="" />
        <img className='w-[145px] absolute top-25 left-7  z-3'src="/hero (1).png" alt="" />
      </div>
      </div>
      </section>
      <div className="flex flex-col gap-5 px-4 mt-24">
     <Button className="text-[18px]" variant="primary">
      Build your own bowl
     </Button>
     <Button className="text-[18px]" variant="outline">
      View
     </Button>
     </div>
      <Banner/>
      <TheProcess/>

    </main>
  )
}

export default HomePage