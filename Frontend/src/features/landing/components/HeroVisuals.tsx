import { ThumbsUp } from "lucide-react";
import AnimatedFloater from "./AnimatedFloater";
import Hero from "@/assets/hero.png";
import { motion } from "motion/react";

function HeroVisuals() {
  return (
    <div className="relative w-full px-5 flex items-center">
      <AnimatedFloater className="bg-lime-300 font-black p-1 flex justify-between gap-3 absolute text-lg right-2 -top-10 z-2 md:-top-1">
        <span className="bg-white rounded-full px-3 flex items-center justify-center border-3">
          <ThumbsUp strokeWidth={3} size={30} />
        </span>
        <p>
          From
          <br />
          89 SEK
        </p>
      </AnimatedFloater>

      <motion.img
        initial={{ scale: 0, x: -10 }}
        animate={{ scale: 1, x: 0 }}
        transition={{
          scale: { type: "spring", delay: 0.5 },
          y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
        src={Hero}
        alt="Image of Bowls"
        className="rounded-full border-3 border-black z-1 shadow-[5px_5px_0_#1c1917] "
      />
    </div>
  );
}

export default HeroVisuals;
