import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

function loadCart(): CartItem[] {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function saveCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
}

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  getItemQty: (id: string) => number;
  getTotalqty: () => number;
  getTotalPrice: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: loadCart(),

  addItem: (item) => {
    const cart = get().items;
    const exists = cart.find((i) => i.id === item.id);

    let updated: CartItem[];
    if (exists) {
      updated = cart.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
      );
    } else {
      updated = [...cart, { ...item, qty: 1 }];
    }
    saveCart(updated);
    set({ items: updated });
  },

  removeItem: (id) => {
    const cart = get().items;
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
    set({ items: updated });
  },

  increaseQty: (id) => {
    const cart = get().items;
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );
    saveCart(updated);
    set({ items: updated });
  },

  decreaseQty: (id) => {
    const cart = get().items;
    const updated = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
      .filter((item) => item.qty > 0);
    saveCart(updated);
    set({ items: updated });
  },

  getItemQty: (id) => {
    const cart = get().items;
    const found = cart.find((item) => item.id === id);
    if (found) {
      return found.qty;
    } else {
      return 0;
    }
  },
  getTotalqty: () => {
    const cart = get().items;
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    if (total) {
      return total;
    } else {
      return 0;
    }
  },
  getTotalPrice: () => {
    const cart = get().items;
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    return total;
  },
  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },
}));
