export type IngredientCategory =
  | "base"
  | "protein"
  | "veg"
  | "sauce"
  | "extra"
  | "drink";

export type Ingredient = {
  _id: string;
  id: string;
  name: string;
  category: IngredientCategory;
  qty: number;
};

export type MenuIngredient = {
  id: string;
  name: string;
  category: IngredientCategory;
};

export type MenuCategory = "bowl" | "drink" | "extra";

export type MenuItem = {
  _id?: string;
  id: string;
  name: string;
  category: MenuCategory;
  img: string;
  price: number;
  desc: string;
  available: boolean;
  customizable?: boolean;
  ingredients: MenuIngredient[];
};

export type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  ingredients: MenuIngredient[];
};

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type Order = {
  _id?: string;
  orderNumber: string;
  customer: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
};
