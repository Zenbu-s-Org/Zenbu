import { create } from "zustand";
import { useCart } from "@/features/cart";

type CheckoutState = {
    paymentMethod: string | null,
    customer: string | null,
    setPaymentMethod: (method: string) => void,
    setCustomer: (value: string) => void,
    submitOrder: () => void
}

export const useCheckout = create<CheckoutState>((set, get) => ({
    paymentMethod: null,
    customer: null,

    setPaymentMethod: (method) => set({paymentMethod: method}),
    setCustomer: (value) => set({ customer: value}),
    
    submitOrder: () => {
        const {paymentMethod, customer} = get()
        const {items} = useCart.getState()
        const totalPrice = useCart.getState().getTotalPrice()

        const order = {
            customer: customer,
            paymentMethod: paymentMethod,
            items: items,
            totalPrice: totalPrice,
        }

        console.log("order:", order)
    },

}))

