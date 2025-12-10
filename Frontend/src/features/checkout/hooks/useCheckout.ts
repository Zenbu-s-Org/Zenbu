import { create } from "zustand";
import { useCart } from "@/features/cart";

type CheckoutState = {
  paymentMethod: string | null;
  customer: string | null;
  setPaymentMethod: (method: string) => void;
  setCustomer: (value: string) => void;
  submitOrder: () => void;
};

export const useCheckout = create<CheckoutState>((set, get) => ({
  paymentMethod: null,
  customer: null,

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setCustomer: (value) => set({ customer: value }),

  submitOrder: async () => {
    const { paymentMethod, customer } = get();
    const { items, getTotalPrice, clearCart } = useCart.getState();
    const totalPrice = getTotalPrice();

    const order = {
      customer: customer,
      paymentMethod: paymentMethod,
      items: items,
      totalPrice: totalPrice,
    };

    const response = await fetch("https://zenbu-ajsi.onrender.com/api/order", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      console.error("Order failed");
      return;
    }
    const result = await response.json();
    localStorage.setItem("currentOrder", result.orderNumber);
    clearCart();
    window.location.href = "/";
  },
}));
