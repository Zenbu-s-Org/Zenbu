import { Label } from "../../components/ui";
import { Button } from "../../components/ui";
import Banner from "./components/Banner";
import ConfirmationBanner from "@/features/orderconfirmation/ConfirmationBanner";
import heroImg from "../../assets/hero (1).png";
import heroImg1 from "../../assets/hero.png";
import waffle from "../../assets/Group.svg";
import SignatureBowls from "./components/SignatureBowls";
import TheProcess from "./components/TheProcess";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <ConfirmationBanner />
      <section className="mt-15 flex flex-row justify-between">
        <section className="pl-4">
          <Label className="mb-4 rotate-4 text-sm" variant="green">
            BETTER FOOD, LESS NOICE
          </Label>
          <div className="mt-1 text-5xl leading-10 font-extrabold tracking-tighter">
            <h1>CRAFT YOUR</h1>
            <h1 className="text-orange-600">PERFECT</h1>
            <h1 className="text-orange-400">BOWL</h1>
          </div>
          <p className="max-w-[170px]">
            Try out our newest concept, craft your own bowl! It will blow your
            mind. From only 149kr
          </p>
        </section>
        <div className="absolute right-4 px-3">
          <div className="relative -z-24 mt-20 h-[260px] w-[170px]">
            <img
              className="absolute bottom-15 left-0 -z-10 w-[191px]"
              src={waffle}
              alt=""
            />
            <img
              className="absolute top-0 z-4 w-[145px]"
              src={heroImg1}
              alt=""
            />
            <img
              className="absolute top-25 left-7 z-3 w-[145px]"
              src={heroImg}
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="mt-35 flex flex-col gap-5 px-4">
        <Link to="/menu" className="w-full">
          <Button className="w-full" variant="primary">
            View Our Menu
          </Button>
        </Link>
        {/* <Button className="text-[18px]" variant="outline">
      View
     </Button> */}
      </div>

      <Banner />

      <TheProcess />

      <SignatureBowls />
    </main>
  );
}

export default HomePage;
