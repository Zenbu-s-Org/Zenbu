import { Swiper, SwiperSlide } from 'swiper/react';
import laxbowl from "../../../assets/lax-bowl.png"
import avocadobowl from "../../../assets/Avocado.png"
import freshbowl from "../../../assets/freshbowl.png"
import { Pagination } from 'swiper/modules';
import { useCart } from "@/features/cart";
import { useState } from 'react';

type SignatureBowl = {
    id: string
    src: string,
    alt: string,
    price: number
    name: string
    ingredient: string
}

const signatureInfo: SignatureBowl[] = [
  { id: "Tokyo Teriyaki",  src: laxbowl,   alt: "lax-bowl-spicy",      name: "Tokyo Teriyaki",  ingredient: "Spicy | Fish", price: 129 },
  { id: "Shanghai Beef",  src: avocadobowl, alt: "beef-bowl", name: "Shanghai Beef",  ingredient: "Mild | Beef", price: 119 },
  { id: "Kyoto Green",  src: freshbowl, alt: "vegan-bowl",   name: "Kyoto Green",  ingredient: "Mild | ",  price: 125 },
];


function SignatureBowls() {
    const [toggle, setToggle] = useState<boolean>(false)
    const { addItem }= useCart()
    function handleButton(info: SignatureBowl){
      addItem({ id: info.id, name: info.name, price: info.price })
      setToggle(true)
      setTimeout(()=> {
        setToggle(false)
      },1500)
        
    }
    
  return (
    <section className="mb-10">
        <h1 className="font-[Bricolage_Grotesque] pl-6 font-bold text-3xl mb-10">Signature Bowls</h1>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper">
            {signatureInfo.map((info,index) => (
                <SwiperSlide key={index} >
                    <section className="  border-2 rounded-xl p-6 flex flex-col justify-between mx-5 mb-8">
                    <img className="w-full h-full object-cover" src={info.src} alt={info.alt} />
                    <section className="flex flex-col gap-3">
                    <p className="font-bold text-2xl font-[Nunito]">{info.name}</p>
                    <p className="font-bold text-gray-500 font-[Nunito]">{info.ingredient}</p>
                    <button onClick={()=> handleButton(info)}className="border-3 rounded-xl px-2 py-1 font-bold bg-lime-300 border-lime-900 text-lime-900 w-full">+ Buy</button>
                    {toggle && <p>Added to cart</p>}
                    </section>
                    </section>
            </SwiperSlide>

            ))}
            
        </Swiper>
        
    </section>
  );
}

export default SignatureBowls;
