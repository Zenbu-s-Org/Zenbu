import { Button } from "@/components/ui";
import type { Order, OrderStatus } from "../../types";
import { useModal } from "@/components/modal";
import { SectionLabel } from "../../components";
import { useState } from "react";

type Props = {
  order: Order;
  onUpdate: (updated: Order) => void;
};

const statusMessages: Record<OrderStatus, string> = {
  pending: "Awaiting payment or staff confirmation",
  preparing: "Payment confirmed — meal is being prepared",
  ready: "Order ready for pickup — awaiting customer",
  completed: "Order picked up and closed",
  cancelled: "Order cancelled — no further action needed",
};

function OrderModal({ order, onUpdate }: Props) {
  const { closeModal } = useModal();
  const date = new Date(order.createdAt);

  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const statusMsg = statusMessages[order.status];

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await onUpdate({ ...order, status });
      closeModal();
    } catch (error) {
      setError("Updated failed. Try Again");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h2>Order: {order.orderNumber}</h2>
      <p>Status: {statusMsg}</p>
      <SectionLabel label="customer">
        <p>{order.customer}</p>
      </SectionLabel>
      <SectionLabel label="createdAt">
        <p>
          {date.toLocaleDateString()} | {date.toLocaleTimeString()}
        </p>
      </SectionLabel>
      <SectionLabel label="payment">
        <p>
          {order.totalPrice} SEK - payed with {order.paymentMethod}
        </p>
      </SectionLabel>
      <SectionLabel label="order">
        <ul className="flex flex-col w-full font-semibold gap-1">
          {order.items.map((i) => (
            <li
              key={i.id}
              className="bg-blue-50 flex flex-col p-1 border-dashed border-2 border-blue-200"
            >
              <div className="flex gap-2">
                <p>{i.name}</p>
                <p>{i.qty}x</p>
              </div>
              <ul className="flex gap-1 ">
                {i.ingredients?.map((ing) => (
                  <li key={ing.id} className="">
                    <p>{ing.name},</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </SectionLabel>
      <SectionLabel label="Change Status">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="border-3 border-stone-900 shadow-[5px_5px_0_#1c1917] rounded-xl px-3 py-1 w-full"
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </SectionLabel>

      <div className="w-full mt-10 flex flex-col gap-5 items-center">
        {error && <span className="font-bold text-red-600">{error}</span>}
        <Button className="w-full" variant="submit" onClick={handleSave}>
          {loading ? "Loading..." : "Save"}
        </Button>
        <Button className="w-full" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default OrderModal;
