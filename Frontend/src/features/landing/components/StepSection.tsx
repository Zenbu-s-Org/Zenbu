import { Container } from "@/components/ui";
import {
  type LucideIcon,
  ChefHat,
  CookingPot,
  Leaf,
  Flame,
  Pickaxe,
} from "lucide-react";
import { motion, type Variants } from "motion/react";

type CardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  variant: "green" | "orange" | "primary" | "sky";
};

const cards: CardProps[] = [
  {
    icon: ChefHat,
    title: "Choose Base",
    desc: "Pick rice, noodles or quinoa as the foundation of your bowl.",
    variant: "orange",
  },
  {
    icon: CookingPot,
    title: "Pick Protein",
    desc: "Add chicken, beef or tofu, cooked fresh to order.",
    variant: "orange",
  },
  {
    icon: Leaf,
    title: "Add Veggies",
    desc: "Top it off with crisp, seasonal vegetables.",
    variant: "orange",
  },
  {
    icon: Flame,
    title: "Sauce It Up",
    desc: "Finish with one of our bold, house-made sauces.",
    variant: "orange",
  },
];

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1], // ✅ korrekt easing-typ
    },
  },
};

function StepSection() {
  return (
    <section className="w-full flex flex-col items-center px-7 pt-5 pb-10">
      <span className="border-2 rounded-full p-2 bg-white shadow-[2px_2px_0_#1c1917]">
        <Pickaxe strokeWidth={2} size={25} />
      </span>

      <h2 className="font-black mt-2 mb-5 uppercase flex items-center gap-3">
        Pick. Mix. Build.
      </h2>

      <p className="text-center max-w-md mb-8 text-lg font-bold">
        Build your bowl in just a few simple steps.
      </p>

      <motion.ul
        className="grid grid-cols-1 gap-10 md:grid-cols-2 auto-rows-fr"
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {cards.map((c, index) => {
          const Icon = c.icon;

          return (
            <motion.li
              key={index}
              variants={itemVariants}
              className="relative h-full"
            >
              <span className="absolute -top-2 -left-1 z-10 rounded-full bg-stone-800 px-3 py-1 text-lg font-bold text-white">
                {index + 1}
              </span>

              <Container
                variant={c.variant}
                className="flex h-full flex-col items-center gap-3 py-5"
              >
                <div className="relative rounded-full border-3 bg-orange-100 p-3">
                  <Icon strokeWidth={2} size={30} color="#1c1917" />
                </div>

                <span className="text-orange-500 font-black text-2xl">
                  {c.title}
                </span>

                <p className="min-h-18 max-w-xs text-center text-lg font-semibold">
                  {c.desc}
                </p>
              </Container>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}

export default StepSection;
