import IngredientBtn from "./IngredientBtn";
import type { Ingredient } from "../types";

type ChooseIngredientsProps = {
  ingredients: Ingredient[];
  selected: Record<string, string | null>;
  toggle: (ingredient: Ingredient) => void;
};

const categories = ["base", "protein", "veg", "sauce"];

const categoryTitles: Record<string, string> = {
  base: "1. Choose base",
  protein: "2. Choose protein",
  veg: "3. Choose vegetables",
  sauce: "4. Choose sauce",
};

function ChooseIngredients({
  ingredients,
  selected,
  toggle,
}: ChooseIngredientsProps) {
  return (
    <div className="flex flex-col lg:mx-6 lg:flex-row">
      {categories.map((category) => {
        const items = ingredients?.filter((i) => i.category === category);
        if (!items?.length) return null;
        return (
          <div
            key={category}
            className="mb-4 rounded-lg border border-stone-400 bg-stone-200 p-4 lg:mx-2 lg:flex-1"
          >
            <h3 className="mb-2 font-['Nunito'] text-sm font-extrabold text-stone-600 uppercase">
              {categoryTitles[category]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((i) => (
                <IngredientBtn
                  key={i._id}
                  ingredient={i}
                  selected={selected[i.category] === i._id}
                  toggle={() => toggle(i)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChooseIngredients;
