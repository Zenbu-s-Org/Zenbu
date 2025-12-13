import { useFetch } from "@/hooks/useFetch";
import { type Ingredient } from "./types";
import ChooseIngredients from "./components/ChooseIngredients";
import { useState } from "react";
import AddToCartBtn from "./components/AddToCartBtn";
import { useCart } from "../cart";
import { Container } from "@/components/ui";
import roundLogo from "../../assets/round-logo.svg";

function BuildYourBowl() {
  const { data: ingredients = [] } = useFetch<Ingredient[]>("/ingredients");

  const [selected, setSelected] = useState<Record<string, string | null>>({
    base: null,
    protein: null,
    veg: null,
    sauce: null,
  });

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelected((prev) => ({
      ...prev,
      [ingredient.category]:
        prev[ingredient.category] === ingredient._id ? null : ingredient._id,
    }));
  };

  const { addItem } = useCart();
  const bowl_price = 149;
  const customId = "custom-" + Math.floor(10000 + Math.random() * 90000);

  const handleConfirm = () => {
    const selectedIngredients = ingredients?.filter((i) =>
      Object.values(selected).includes(i._id)
    );

    const bowlItem = {
      id: customId,
      name: "Custom Bowl",
      price: bowl_price,
      ingredients: selectedIngredients?.map((i) => i.name),
    };

    addItem(bowlItem);
  };

  const isDisabled = Object.values(selected).some((v) => v === null);

  return (
    <section className="w-full px-4 py-20">
      <Container
        variant="primary"
        className="relative flex flex-col items-center"
      >
        <span className="absolute -top-10 -rotate-6 rounded-3xl border-4 border-lime-900 bg-lime-300 px-6 py-1 font-['Bricolage_Grotesque'] text-2xl font-bold text-lime-900 uppercase">
          149 sek
        </span>
        <img src={roundLogo} alt="round-logo" className="my-4"></img>
        <h2 className="font-['Bricolage_Grotesque']">Build Your Own Bowl</h2>
        <h3 className="mb-6 font-['Nunito'] text-lg">
          Click to swap ingredients
        </h3>

        <ChooseIngredients
          ingredients={ingredients}
          selected={selected}
          toggle={toggleIngredient}
        />

        <AddToCartBtn onConfirm={handleConfirm} disabled={isDisabled} />
      </Container>
    </section>
  );
}

export default BuildYourBowl;
