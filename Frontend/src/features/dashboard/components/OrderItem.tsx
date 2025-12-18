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

      fullOrder.items.forEach((item: any) => {
        for (let i = 0; i < item.qty; i++) {
          addItem({
            id: item.id,
            name: item.name,
            price: item.price,
          });
        }
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/menu");
      }, 1500);
    } catch (error) {
      console.error("Error adding order to cart:", error);
      alert("Failed to add items to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative rounded-xl border-3 border-stone-900 bg-stone-50 p-4 md:p-6">
      {showSuccess && (
        <div className="bg-opacity-90 absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-lime-300">
          <p className="text-2xl font-bold text-stone-900">✓ Added to Cart!</p>
        </div>
      )}

      {/* Desktop: Horizontal layout, Mobile: Vertical layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left section - Order info */}
        <div className="flex-1">
          <p className="mb-1 text-sm md:text-base font-bold">
            {order.orderNumber}
          </p>
          <p className="text-sm md:text-base text-stone-600">{order.items}</p>
        </div>

        {/* Middle section - Status */}
        <div className="flex items-center gap-2 md:justify-center">
          <p className="text-sm md:text-base text-stone-800">Status:</p>
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
            className="px-3 text-xs md:text-sm"
          >
            {order.status === "pending" && "Pending"}
            {order.status === "preparing" && "Preparing"}
            {order.status === "ready" && "Ready"}
            {order.status === "completed" && "Completed"}
            {order.status === "cancelled" && "Cancelled"}
          </Label>
        </div>

        {/* Right section - Price and action */}
        <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2">
          <p className="text-sm md:text-base font-bold flex-1 md:flex-none">
            {order.price} SEK
          </p>
          <Button
            variant="link"
            className="px-4 py-1 text-sm md:text-base md:min-w-[140px]"
            onClick={handleOrderAgain}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Order Again?"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
