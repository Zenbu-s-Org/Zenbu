import { useState, useEffect, startTransition } from "react";
import OrdersTable from "./components/OrdersTable";
import OrderModal from "./components/OrderModal";
import { useModal } from "@/components/modal";
import { useFetch } from "@/hooks/useFetch";
import type { Order } from "../types";
import { getAuthHeaders } from "@/config/apiConfig";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const { openModal } = useModal();
  const { data } = useFetch<Order[]>("/order");

  useEffect(() => {
    if (!data) return;
    startTransition(() => {
      setOrders(data);
    });
  }, [data]);

  const handleSelect = (order: Order) => {
    openModal(
      <OrderModal
        order={order}
        onUpdate={(updatedOrder) => handleUpdate(updatedOrder)}
      />
    );
  };

  const handleUpdate = async (updated: Order) => {
    const response = await fetch(`api/order/${updated.orderNumber}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      credentials: "include",
      body: JSON.stringify(updated),
    });

    if (!response.ok) {
      console.log("update error", Error);
      throw new Error("Update failed");
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.orderNumber === updated.orderNumber ? updated : order
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1>Orders</h1>
      <section className="w-full px-3">
        <OrdersTable data={orders} onSelect={handleSelect} />
      </section>
    </div>
  );
}

export default OrdersPage;
