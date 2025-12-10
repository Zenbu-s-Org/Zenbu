import { Swiper, SwiperSlide } from "swiper/react";
import laxbowl from "../../../assets/lax-bowl.png";
import avocadobowl from "../../../assets/Avocado.png";
import freshbowl from "../../../assets/freshbowl.png";
import { Pagination } from "swiper/modules";

type signatureProps = {
  src: string;
  alt: string;
  title: string;
  ingridient: string;
};

const signatureInfo: signatureProps[] = [
  {
    src: laxbowl,
    alt: "lax-bowl-spicy",
    title: "Spicy Bowl",
    ingridient: "Spicy | Fish",
  },
  {
    src: avocadobowl,
    alt: "avocado-bowl-vegan",
    title: "Vegan Bowl",
    ingridient: "Mild | Vegan",
  },
  {
    src: freshbowl,
    alt: "salmon-onion-mild",
    title: "Fresh Bowl",
    ingridient: "Mild |Fish",
  },
];

function SignatureBowls() {
  return (
    <section className="mb-10">
      <h1 className="mb-10 pl-6 font-[Bricolage_Grotesque] text-3xl font-bold">
        Signature Bowls
      </h1>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        slidesPerView={1}
        className="mySwiper"
      >
        {signatureInfo.map((info, index) => (
          <SwiperSlide key={index}>
            <section className="mx-5 mb-8 flex flex-col justify-between rounded-xl border-2 p-6">
              <img
                className="h-full w-full object-cover"
                src={info.src}
                alt={info.alt}
              />
              <section className="flex flex-col gap-3">
                <p className="font-[Nunito] text-2xl font-bold">{info.title}</p>
                <p className="font-[Nunito] font-bold text-gray-500">
                  {info.ingridient}
                </p>
                <button className="w-full rounded-xl border-3 border-lime-900 bg-lime-300 px-2 py-1 font-bold text-lime-900">
                  + Buy
                </button>
              </section>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default SignatureBowls;
