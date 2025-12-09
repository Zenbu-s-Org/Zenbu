export type MenuIngredient = {
  id: string;
  name: string;
  type: "base" | "protein" | "veg" | "sauce" | string;
}

export type MenuItem = {
  _id: string;
  id: string;
  name: string;
  category: string;
  img?: string;
  price: number;
  desc?: string
  ingredients?: MenuIngredient[];
};