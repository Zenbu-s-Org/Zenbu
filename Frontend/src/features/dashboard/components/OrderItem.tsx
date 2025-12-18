import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import type { Order } from "@/features/dashboard/Types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/features/cart/hooks/useCart";
import { API_URL } from "@/config/apiConfig";
import { getAuthHeaders } from "@/config/apiConfig";

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

      const response = await fetch(`${API_URL}/order/${order.orderNumber}`, {
        credentials: "include",
        headers: getAuthHeaders(),
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
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative rounded-xl border-3 border-stone-900 bg-stone-50 p-4 md:p-6 hover:shadow-lg transition-shadow">
      {showSuccess && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-lime-300/90 backdrop-blur-sm">
          <p className="text-2xl font-bold text-stone-900">✓ Added to Cart!</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <div>
              <p className="text-sm md:text-base font-bold text-stone-900">
                Order #{order.orderNumber}
              </p>
            </div>
            <p className="text-base md:text-lg font-bold text-stone-900 md:hidden">
              {order.price} SEK
            </p>
          </div>

          <p className="text-sm md:text-base text-stone-600 mb-3 md:mb-4">
            {order.items}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-700 font-medium">
                Status:
              </span>
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
                className="px-3 py-1 text-xs md:text-sm"
              >
                {order.status === "pending" && "Pending"}
                {order.status === "preparing" && "Preparing"}
                {order.status === "ready" && "Ready"}
                {order.status === "completed" && "Completed"}
                {order.status === "cancelled" && "Cancelled"}
              </Label>
            </div>

            <Button
              variant="link"
              className="px-4 py-1.5 text-sm"
              onClick={handleOrderAgain}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Order Again?"}
            </Button>
          </div>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-lg font-bold text-stone-900">{order.price} SEK</p>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
