import { Label, Button } from "@/components/ui";
import { Sparkles } from "lucide-react";
import HeroVisuals from "./HeroVisuals";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col items-center gap-15 min-h-screen max-w-lg px-10 pb-20 md:flex-row md:max-w-5xl">
      <div className="flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <Label
            variant="green"
            className="text-sm flex items-center justify-center gap-1 rotate-4 w-max"
          >
            <Sparkles size={15} /> Better Food, Less Noise
          </Label>
          <h1 className="text-5xl font-black text-center uppercase md:text-6xl ">
            Craft Your <br /> <span className="text-orange-500">Perfect</span>
            <br /> Bowl
          </h1>
          <motion.p
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.5 }}
            className="font-semibold border-s-2 border-s-green-300 px-2 mt-2"
          >
            Fresh ingredients, bold flavors, made exactly how you want it.
            Experience the art of the bowl at Zenbu.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.6 }}
          className="flex flex-col w-full gap-3 mt-3"
        >
          <Button onClick={() => navigate("/menu#buildbowl")}>
            Build Your Bowl
          </Button>
          <Button variant="outline" onClick={() => navigate("/menu")}>
            View Full Menu
          </Button>
        </motion.div>
      </div>
      <div className="w-full mt-10">
        <HeroVisuals />
      </div>
    </section>
  );
}

export default HeroSection;
