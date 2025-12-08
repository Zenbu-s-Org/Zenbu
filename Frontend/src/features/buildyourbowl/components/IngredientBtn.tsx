import { Label } from "@/components/ui"
import type { Ingredient } from "../types";

type IngredientBtnProps = {
    ingredient: Ingredient;
    selected: boolean;
    toggle: () => void;
}

const categoryColors: Record<string, "green" | "orange" | "purple" | "sky" | "gray"> = {
    base: "green",
    protein: "orange",
    veg: "sky",
    sauce: "purple",
    default: "gray"
};

function IngredientBtn({ ingredient, selected, toggle }: IngredientBtnProps) {
    const variant = selected ? categoryColors[ingredient.category] : categoryColors.default;

  return (
    <div onClick={toggle}>
        <Label variant={variant} className="cursor-pointer">{ingredient.name}</Label>
    </div>
  )
}

export default IngredientBtn