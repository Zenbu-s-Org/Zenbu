import type { Ingredient } from "../buildyourbowl/types";

export type Product = {
  name: string;
  id: string;
  price: number;
  qty: number;
  ingredients: Ingredient[];
};

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export type Order = {
  orderNumber: string;
  customer: string;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  paymentMethod?: string;
  items: Product[];
};
