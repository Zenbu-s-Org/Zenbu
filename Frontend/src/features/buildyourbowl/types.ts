export type Ingredient = {
  _id: string;
  id: string;
  name: string;
  category: "base" | "protein" | "veg" | "sauce";
  qty: number;
};
