import { motion } from "motion/react";
type MarqueeProps = {
  className?: string;
  children: React.ReactNode;
};

function Marquee({ className, children }: MarqueeProps) {
  return (
    <div
      className={`bg-orange-500 py-2 md:py-4 border-y-2 border-black
                  overflow-hidden whitespace-nowrap relative -rotate-1
                  shadow-lg z-20 ${className}`}
    >
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear",
        }}
        className="inline-flex"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="mx-4 md:mx-6 text-xl md:text-3xl
                       font-black uppercase tracking-wider"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Marquee;
