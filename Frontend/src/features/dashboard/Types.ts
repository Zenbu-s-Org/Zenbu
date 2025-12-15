// Dashboard Types
export type Stats = {
  totalOrders: number;
  amountSpent: number;
};

export type BackendOrder = {
  _id: string;
  orderNumber: string;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price: number;
  }>;
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
};

export type FormattedOrder = {
  id: string;
  orderNumber: string;
  items: string;
  price: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
};

export type Order = FormattedOrder;
