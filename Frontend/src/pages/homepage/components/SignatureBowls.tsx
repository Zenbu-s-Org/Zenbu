import { Swiper, SwiperSlide } from 'swiper/react';
import laxbowl from "../../../assets/lax-bowl.png"
import avocadobowl from "../../../assets/Avocado.png"
import freshbowl from "../../../assets/freshbowl.png"
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

type signatureProps = {
    src: string,
    alt: string,
    title: string
    ingridient: string
}

const signatureInfo: signatureProps[] = [
    {src: laxbowl,alt: "lax-bowl-spicy", title: "Spicy Bowl", ingridient: "Spicy | Fish"},
    {src: avocadobowl,alt: "avocado-bowl-vegan", title: "Vegan Bowl", ingridient: "Mild | Vegan"},
    {src: freshbowl,alt: "salmon-onion-mild", title: "Fresh Bowl", ingridient: "Mild |Fish"},
  
]

function SignatureBowls() {
  return (
    <section className="mb-10">
        <h1 className="font-[Bricolage_Grotesque] pl-6 font-bold text-3xl mb-10">Signature Bowls</h1>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper">
            {signatureInfo.map((info,index) => (
                <SwiperSlide key={index} >
                    <section className="  border-2 rounded-xl p-6 flex flex-col justify-between mx-5 mb-8">
                    <img className="w-full h-full object-cover" src={info.src} alt={info.alt} />
                    <section className="flex flex-col gap-3">
                    <p className="font-bold text-2xl font-[Nunito]">{info.title}</p>
                    <p className="font-bold text-gray-500 font-[Nunito]">{info.ingridient}</p>
                    <button className="border-3 rounded-xl px-2 py-1 font-bold bg-lime-300 border-lime-900 text-lime-900 w-full">+ Buy</button>
                    </section>
                    </section>
            </SwiperSlide>

            ))}
            
        </Swiper>
        
    </section>
  )
}

export default SignatureBowls