import aboutimage from "../assets/image1.png"
import aboutimagetwo from "../assets/about-image.png"
import { Container } from '@/components/ui'
import Contact from "@/features/contact/components/Contact"
import ImagePlaceholder from "../assets/imgPlaceholder.svg"

function AboutPage() {
  return (
    <div className="px-6 flex flex-col gap-5 mb-7.5">
    <h1 className="border-b-2 border-orange-400 w-50 my-5">About us</h1>
    <div className="flex flex-col gap-4 md:flex md:flex-row md:gap-4 ">
    <Container variant="sky">
            <img className=' p-2 object-cover w-300 h-full' src={aboutimage ||  ImagePlaceholder} alt="image of people eating inside resturant" />
    </Container>
    <Container variant="green">
        <p className="p-2 leading-relaxed">
            Started by food lovers who wanted to share the joy of Thai cuisine, we've made it our mission to bring restaurant-quality meals straight to your door.
            No compromise on flavor, no shortcuts in preparation – just delicious <span className="text-lime-400 font-bold">Thai food crafted with care and delivered fresh.
            Build your perfect bowl, and let us handle the rest.</span> </p>
    </Container>
    </div>
    <Container variant="orange">
        <div className="md:flex flex-row">
        <img className=' w-full object-cover rounded md:w-1/2' src={aboutimagetwo ||  ImagePlaceholder} alt="image of people eating inside resturant" />
        <p className="md:w-1/2">
        We believe great Thai food should be personal. That's why we've built our menu around you,
         giving you the freedom to create custom bowls that match your taste perfectly.
          <span className="font-bold text-orange-400">Whether you crave the heat of authentic</span>
          </p>
        </div>
    </Container>
    <Contact/>
    </div>
  )
}

export default AboutPage