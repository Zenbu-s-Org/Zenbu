import { cn } from "clsx-for-tailwind";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useState, useEffect, startTransition } from "react";
import Order from "./components/Order";
import { useFetch } from "@/hooks/useFetch";

type ItemProps = {
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
  const [toggle, setToggle] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => setOrderId(localStorage.getItem("currentOrder")));
  }, []);
  const { data, refetch } = useFetch<ItemProps>(
    orderId ? `/order/${orderId}` : null
  );

  useEffect(() => {
    if (!orderId) return;
    if (!data) return;

    if (data.status === "cancelled" || data.status === "completed") {
      localStorage.removeItem("currentOrder");
      startTransition(() => setOrderId(null));
      return;
    }

    const timeout = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(timeout);
  }, [orderId, data, refetch]);

  if (
    !orderId ||
    !data ||
    data.status === "cancelled" ||
    data.status === "completed"
  ) {
    return null;
  }

  return (
    <div
      className={cn("fixed top-15 z-10 w-full text-orange-900", {
        "bg-orange-300": data.status === "pending",
        "bg-fuchsia-300": data.status === "preparing",
        "bg-lime-300": data.status === "ready",
      })}
    >
      <section className="flex flex-col items-center pt-2 font-bold">
        <h2 className="border-b text-lg">Your order</h2>
        <p className="text-sm">Order: {orderId}</p>
        <p className="text-sm">Status: {data.status}</p>
      </section>

      {toggle &&
        data.items.map((item, i) => (
          <Order key={i} title={item.name} qty={item.qty} />
        ))}
      <section className="flex flex-col items-center pb-1">
        <button onClick={() => setToggle(!toggle)}>
          {toggle ? <ChevronUp /> : <ChevronDown />}
        </button>
      </section>
    </div>
  );
}

export default ConfirmationBanner;
