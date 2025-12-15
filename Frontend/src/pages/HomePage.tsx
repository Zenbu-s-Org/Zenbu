import {
  HeroSection,
  Marquee,
  StepSection,
  BowlsCarousel,
} from "@/features/landing";
import { Label } from "@/components/ui";
import ConfirmationBanner from "@/features/orderconfirmation/ConfirmationBanner";

function HomePage() {
  return (
    <div className="flex flex-col items-center overflow-x-hidden pt-15 bg-stone-50 md:pt-5">
      <ConfirmationBanner />
      <HeroSection />
      <div className=" bg-blue-100 w-full pb-10">
        <Marquee className="-top-4 text-white">
          Start building <span className="text-black">•</span> Order online{" "}
          <span className="text-black">•</span> Ready when you are{" "}
          <span className="text-black">•</span>
        </Marquee>
        <StepSection />
      </div>
      <div className="w-full px-5 relative flex flex-col items-center">
        <Label
          variant="green"
          className="text-center text-sm w-max absolute -top-4 rotate-3"
        >
          Can't Decide?
        </Label>
        <BowlsCarousel />
      </div>
    </div>
  );
}

export default HomePage;
