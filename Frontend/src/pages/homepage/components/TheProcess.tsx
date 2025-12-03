import fireIcon from "../../../assets/flame-outline.png"
import { Container } from '../../../components/ui'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

type containerProps = {
    variant: string,
    title: string,
    text: string,
}

const containerInfo: containerProps[] = [
    {
        variant: "sky",
        title: "Step 1 - Order",
        text: "Browse our menu and place your order through our app or website. Choose your favorite dishes and customize them to your liking."
    
    },
    {
        variant: "green",
        title: "Step 2 - Prepare",
        text: "Our kitchen team prepares your meal fresh to order using premium ingredients. Every dish is carefully crafted to meet our quality standards. "
    
    },
     {
        variant: "orange",
        title: "Step 3 - Come get it!",
        text: "Your order is packaged for you to get it!. Enjoy restaurant-quality food in the comfort of your home."
    
    },


]

function TheProcess() {

    
  return (
    <main className='mb-20 mt-5'>
        <section className='pl-8'>
        <h1 className='text-2xl font-bold font-[Bricolage_Grotesque]'>The Process</h1>
        <p className='mb-3'>Follow along how we do things</p>
        </section>
        <Swiper pagination={true} modules={[Pagination]} slidesPerView={1} className="mySwiper" >
            {containerInfo.map((con,index) => (
                <SwiperSlide key={index}>
                <div className='p-6 pb-10'>
                <Container className='p-2' variant={con.variant}>
                    <section className='flex flex-col items-center gap-5 w-[300px] h-[220px]'>
                        <section className='flex items-center w-full px-4'>
                        <img src={fireIcon} alt="icon fire emoji" />
                        <p className='font-medium'>{con.title}</p>
                        </section>
                        <p className='max-w-[250px] font-medium font-[Nunito]' >{con.text}</p>
                    </section>
                    
                </Container>
                 </div>   
                
            </SwiperSlide>

            ))}
            
           
            
         </Swiper>
                 
       
    </main>
  )
}

export default TheProcess