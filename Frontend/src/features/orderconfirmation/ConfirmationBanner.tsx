import { useState, useEffect, startTransition } from "react";
import { useFetch } from "@/hooks/useFetch";
import OrderBannerContent from "./components/OrderBannerContent";
import ConfirmCancelModal from "./components/ConfirmCancelModal";

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
  const [isCancelling, setIsCancelling] = useState(false);

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

  // Cancel order handler
  const handleCancelOrder = async () => {
    if (!orderId) return;

    setIsCancelling(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      if (result.success) {
        setShowCancelModal(false);
        refetch();
      } else {
        alert(result.message || "Kunde inte avbryta beställningen");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Något gick fel vid avbokning");
    } finally {
      setIsCancelling(false);
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
      />

      <ConfirmCancelModal
        isOpen={showCancelModal}
        isLoading={isCancelling}
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelModal(false)}
      />
    </>
  );
}

export default ConfirmationBanner;
