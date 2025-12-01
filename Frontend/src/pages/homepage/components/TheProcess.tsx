import React, { useState, useRef } from 'react'
import { Container } from '../../../components/ui'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

// type containerProps = {
//     title: string,
//     text:string
    
// }

// const containerInfo: containerProps[] = [
//     {title: "Step 1 - Order" , text: "blablabla"},
//     {title: "Step 2 - Order" , text: "blablabla"},
//     {title: "Step 3 - Order" , text: "blablabla"},
// ]


function TheProcess() {

    
  return (
    <main className='mb-20 mt-5'>
        <section className='pl-10'>
        <h1 className='text-2xl font-bold'>The Process</h1>
        <p className='mb-3'>Follow along how we do things</p>
        </section>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper" >
            <SwiperSlide>
                <div className='p-6'>
                <Container className='px-4' variant='sky'>
                    <section className='flex items-center gap-5'>
                        <img src="/flame-outline.png" alt="icon fire emoji" />
                        <p className='font-medium'>Step 1 - Order</p>
                    </section>
                    <p className='max-w-[250px]' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, recusandae voluptates! Quaerat,</p>
                </Container>
                 </div>   
                
            </SwiperSlide>
            <SwiperSlide>
                <div className='p-6'>
                 <Container variant='green'>
                    <section className='flex items-center gap-5'>
                        <img src="/flame-outline.png" alt="icon fire emoji" />
                        <p className='font-medium'>Step 1 - Order</p>
                    </section>
                    <p className='max-w-[250px]' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, recusandae voluptates! Quaerat,</p>
                </Container>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='p-6'>
                 <Container variant='orange'>
                    <section className='flex items-center gap-5'>
                        <img src="/flame-outline.png" alt="icon fire emoji" />
                        <p className='font-medium'>Step 1 - Order</p>
                    </section>
                    <p className='max-w-[250px]' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, recusandae voluptates! Quaerat,</p>
                    
                </Container>
                </div>
            </SwiperSlide>
         </Swiper>
                 
       
    </main>
  )
}

export default TheProcess