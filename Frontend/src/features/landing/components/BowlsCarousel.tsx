import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/features/cart";
import type { MenuItem } from "@/features/menu";
import { Container, Button } from "@/components/ui";
import { motion } from "motion/react";

function BowlsCarousel() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const { data: menu } = useFetch<MenuItem[]>("/menu");
  const bowls = menu?.filter((item) => item.category === "bowl") ?? [];

  function handleAddToCart(bowl: MenuItem) {
    addItem(bowl);
    navigate("/menu");
  }

  if (!bowls.length) return null;

  return (
    <motion.section
      className="w-full pt-10 pb-20 flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-xl font-black text-center mb-6 lg:text-3xl">
        Check Our Signature Bowls Out
      </h2>

      <div
        className="
          flex gap-6 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide
          lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible
        "
      >
        {bowls.map((bowl, index) => (
          <motion.div
            key={bowl.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="snap-start min-w-60 sm:min-w-[280px] lg:min-w-0 py-5"
          >
            <Container variant="green" className="flex flex-col h-full">
              <div className="h-40 overflow-hidden rounded-t-lg">
                <img
                  src={bowl.img}
                  alt={bowl.name}
                  className="w-full h-full object-contain scale-90"
                />
              </div>

              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-black">{bowl.name}</span>
                  <span className="font-bold">{bowl.price} kr</span>
                </div>

                <p className="text-sm opacity-80 line-clamp-2 mb-2">
                  {bowl.desc}
                </p>

                <Button
                  onClick={() => handleAddToCart(bowl)}
                  className="mt-auto"
                >
                  Add to cart
                </Button>
              </div>
            </Container>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default BowlsCarousel;
