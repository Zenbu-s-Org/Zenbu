import { useAuthStore } from "@/stores/authStore";
import { useCheckout } from "../hooks/useCheckout"
import { useState } from "react";
import { Button, Input } from "@/components/ui";

function CustomerDetails() {
    const { submitOrder, setCustomer } = useCheckout();
    const { user } = useAuthStore();

    const [name, setName] = useState(user?.name ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [error, setError] = useState("");

    function handlePlaceOrder() {
        if (!name.trim()) {
            setError("*Name is required");
            return;
        }
        setError("");
        setCustomer({ name, phone });
        submitOrder();
    }

  return (
    <div className="flex flex-col gap-6 w-[80%] mt-8">
      <Input
          label="Name"
          type="email"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Phone Number"
          type="number"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button variant="submit" className="mt-6" onClick={handlePlaceOrder}>Place Order</Button>
    </div>
  )
}

export default CustomerDetails