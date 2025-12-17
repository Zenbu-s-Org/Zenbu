import { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { useCart } from "@/features/cart/hooks/useCart";
import { API_URL } from "@/config/apiConfig";
import OrderBannerContent from "./components/OrderBannerContent";
import ConfirmCancelModal from "./components/ConfirmCancelModal";
import ConfirmEditModal from "./components/ConfirmEditModal"; // ✅ LÄGG TILL DENNA RAD

type OrderData = {
  orderId: string;
  status: "pending" | "preparing" | "ready" | "cancelled" | "completed";
  items: {
    name: string;
    qty: number;
    id: string;
    price: number;
  }[];
};

function ConfirmationBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { addItem } = useCart();
  const navigate = useNavigate();

  // Hämta currentOrder från localStorage
  useEffect(() => {
    startTransition(() => setOrderId(localStorage.getItem("currentOrder")));
  }, []);

  // Fetcha order data
  const { data, refetch } = useFetch<OrderData>(
    orderId ? `/order/${orderId}` : null
  );

  // Polling och cleanup
  useEffect(() => {
    if (!orderId || !data) return;

    if (data.status === "cancelled" || data.status === "completed") {
      localStorage.removeItem("currentOrder");
      startTransition(() => setOrderId(null));
      return;
    }

    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId, data, refetch]);

  const handleCancelOrder = async () => {
    if (!orderId) return;
    setIsCancelling(true);

    try {
      const response = await fetch(`${API_URL}/order/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        setShowCancelModal(false);
        refetch();
      } else {
        console.error("Cancel failed:", result.message);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleEditOrder = async () => {
    if (!orderId || !data) return;
    setIsEditing(true);

    try {
      // 1. Lägg alla items från ordern i cart
      data.items.forEach((item) => {
        for (let i = 0; i < item.qty; i++) {
          addItem({
            id: item.id,
            name: item.name,
            price: item.price,
          });
        }
      });

      await fetch(`${API_URL}/order/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      localStorage.removeItem("currentOrder");

      navigate("/menu");
    } catch (error) {
      console.error("Error editing order:", error);
    } finally {
      setIsEditing(false);
    }
  };

  // Visa inte bannern om ingen order eller cancelled/completed
  if (
    !orderId ||
    !data ||
    data.status === "cancelled" ||
    data.status === "completed"
  ) {
    return null;
  }

  return (
    <>
      <OrderBannerContent
        orderId={orderId}
        status={data.status}
        items={data.items}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        onCancelClick={() => setShowCancelModal(true)}
        onEditClick={() => setShowEditModal(true)}
      />

      <ConfirmCancelModal
        isOpen={showCancelModal}
        isLoading={isCancelling}
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelModal(false)}
      />

      <ConfirmEditModal
        isOpen={showEditModal}
        isLoading={isEditing}
        onConfirm={handleEditOrder}
        onCancel={() => setShowEditModal(false)}
      />
    </>
  );
}

export default ConfirmationBanner;
