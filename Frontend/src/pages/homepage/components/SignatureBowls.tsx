import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useCart } from "@/features/cart";
import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import type { MenuItem } from '@/features/menu';
import imgplaceholder from "../../../assets/imgPlaceholder.svg"


function SignatureBowls() {
    const { data: menu = [] } = useFetch<MenuItem[]>("/menu");
    const [toggle, setToggle] = useState<boolean>(false)
    const { addItem }= useCart()
    function handleButton(info:MenuItem){
      addItem({ 
          id: info.id
        , name: info.name
        , price: info.price })
      setToggle(true)
      setTimeout(()=> {
        setToggle(false)
      },2000)
        
    }
    
  return (
    <section className="mb-10">
        <h1 className="font-[Bricolage_Grotesque] pl-6 font-bold text-3xl mb-10">Signature Bowls</h1>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper">
            {menu?.filter(info => info.category === "bowl").slice(0,3).map((info,index) => (
                <SwiperSlide key={index} >
                    <section className="  border-2  rounded-xl p-6 flex flex-col justify-between mx-5 mb-8">
                    <img className="w-full h-full object-cover" src={info.img || imgplaceholder} onError={(e) => (e.currentTarget.src = imgplaceholder)} />
                    <section className="flex flex-col gap-3 pt-3">            
                    <p className="font-bold text-2xl font-[Nunito]">{info.name}</p>
                    <p className="font-bold text-gray-500 font-[Nunito]">{info.price}kr</p>
                    <button onClick={() => handleButton(info)}className="border-3 rounded-xl px-2 py-1 font-bold bg-lime-300 border-lime-900 text-lime-900 w-full">+ Buy</button>
                    {toggle && <p className='absolute right-10  font-bold animate-bounce text-orange-600 border-b p-1'>Added to cart</p>}
                    </section>
                    </section>
            </SwiperSlide>

            ))}
            
        </Swiper>
        
    </section>
  );
}

export default SignatureBowls;
