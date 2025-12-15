import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className: string;
};
function AnimatedFloater({ children, className }: Props) {
  return (
    <motion.div
      initial={{ scale: 0, x: 50 }}
      animate={{ scale: 1, x: 0, y: [0, -10, 0] }}
      transition={{
        scale: { type: "spring", delay: 0.8 },
        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      }}
      className={`shadow-[5px_5px_0_#1c1917] border-3 rounded-4xl p-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedFloater;
