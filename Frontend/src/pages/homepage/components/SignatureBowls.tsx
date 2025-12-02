import { Swiper, SwiperSlide } from 'swiper/react';
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
    {src: "/lax-bowl.png",alt: "lax-bowl-spicy", title: "Spicy Bowl", ingridient: "Spicy | Fish"},
    {src: "/Avocado.png",alt: "avocado-bowl-vegan", title: "Vegan Bowl", ingridient: "Mild | Vegan"},
    {src: "/freshbowl.png",alt: "salmon-onion-mild", title: "Fresh Bowl", ingridient: "Mild |Fish"},
  
]

function SignatureBowls() {
  return (
    <main className="pl-10 mb-10 ">
        <h1 className="font-extrabold text-3xl mb-5">Signature Bowls</h1>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper">
            {signatureInfo.map((info,index) => (
                <SwiperSlide key={index} >
                    <section className="w-[332px] h-[462px] border-2 rounded-xl p-2 flex flex-col justify-between mb-10">
                    <img className="w-full h-full object-cover" src={info.src} alt={info.alt} />
                    <section className="flex flex-col gap-3">
                    <p className="font-bold text-2xl">{info.title}</p>
                    <p className="font-bold text-gray-500">{info.ingridient}</p>
                    <button className="border-3 rounded-xl px-2 py-1 font-bold bg-lime-300 border-lime-900 text-lime-900 w-full">+ Buy</button>
                    </section>
                    </section>
            </SwiperSlide>

            ))}
            
        </Swiper>
        
    </main>
  )
}

export default SignatureBowls