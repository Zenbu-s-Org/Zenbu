import { create } from "zustand";
import { useCart } from "@/features/cart";
import { getAuthHeaders } from "@/config/apiConfig";
import { useAuthStore } from "@/stores/authStore";

type Customer = {
  name?: string;
  phone?: string;
};

type CheckoutState = {
  paymentMethod: string | null;
  customer: Customer | null;
  setPaymentMethod: (method: string) => void;
  setCustomer: (value: Customer) => void;
  submitOrder: () => void;
};

const API_URL = import.meta.env.VITE_API_URL;

export const useCheckout = create<CheckoutState>((set, get) => ({
  paymentMethod: null,
  customer: null,

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setCustomer: (value) => set({ customer: value }),

  submitOrder: async () => {
    const { paymentMethod, customer } = get();
    const { items, getTotalPrice, clearCart } = useCart.getState();
    const { user, isAuthenticated } = useAuthStore.getState();
    const totalPrice = getTotalPrice();

    const order = {
      userId: isAuthenticated && user ? user.id : undefined,
      customer: customer,
      paymentMethod: paymentMethod,
      items: items,
      totalPrice: totalPrice,
    };

    const response = await fetch(`${API_URL}/order`, {
      headers: getAuthHeaders(),
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
