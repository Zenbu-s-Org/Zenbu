import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import type { Order } from "@/features/dashboard/Types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/hooks/useCart";
import { API_URL } from "@/config/apiConfig";

type OrderItemProps = {
  order: Order;
};

function OrderItem({ order }: OrderItemProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOrderAgain = async () => {
    try {
      setIsAdding(true);

      // Hämta full order från backend för att få alla items
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/order/${order.orderNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const fullOrder = await response.json();

      // Lägg till alla items från ordern i cart
      fullOrder.items.forEach((item: any) => {
        for (let i = 0; i < item.qty; i++) {
          addItem({
            id: item.id,
            name: item.name,
            price: item.price,
          });
        }
      });

      // Visa success till användaren
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/menu"); // Vi kan navigera användaren till meny eller en annan endpoint här.
      }, 1500);
    } catch (error) {
      console.error("Error adding order to cart:", error);
      alert("Failed to add items to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative rounded-xl border-3 border-stone-900 bg-stone-50 p-4">
      {showSuccess && (
        <div className="bg-opacity-90 absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-lime-300">
          <p className="text-2xl font-bold text-stone-900">✓ Added to Cart!</p>
        </div>
      )}

      <div className="mb-3 flex items-start gap-3">
        <div className="text-2xl"></div>

        <div className="flex-1">
          <p className="mb-1 text-sm font-bold">{order.orderNumber}</p>
          <p className="text-sm text-stone-600">{order.items}</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold">{order.price} SEK</p>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <p className="text-sm text-stone-800">Status:</p>
        <Label
          variant={
            order.status === "pending"
              ? "orange"
              : order.status === "preparing"
                ? "orange"
                : order.status === "ready"
                  ? "green"
                  : "green"
          }
          className="px-3 text-xs"
        >
          {order.status === "pending" && "Pending"}
          {order.status === "preparing" && "Preparing"}
          {order.status === "ready" && "Ready"}
          {order.status === "done" && "Done"}
        </Label>
      </div>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="link"
          className="flex-1 px-4 py-1 text-sm"
          onClick={handleOrderAgain}
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Order Again?"}
        </Button>
      </div>
    </div>
  );
}

export default OrderItem;