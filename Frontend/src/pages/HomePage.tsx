
import React from 'react'
function HomePage() {
  return (
    <main className='mt-20'>
      <section>
        <span className=''>BETTER FOOD, LESS NOICE</span>
        <div className='text-[40px] font-extrabold' >
          <h1>CRAFT YOUR</h1>
          <h1 className='text-[#EA580C]'>PERFECT</h1>
          <h1 className='text-[#FB923C]'>BOWL</h1>
        </div>
        <p className='max-w-[200px] text-[12px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
      </section>
      
      <div className='relative w-[260px] h-[260px]'>
        <img className='w-[191px] absolute bottom-10 left-0 -z-10' src="/Group.svg" alt="" />
        <img className='w-[145px] absolute top-0  z-4' src="/hero.png" alt="" />
        <img className='w-[145px] absolute top-25 left-7  z-3'src="/hero (1).png" alt="" />
      </div>
      
    </main>
  )
}

export default HomePage