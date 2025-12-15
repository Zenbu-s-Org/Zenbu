import { cn } from "clsx-for-tailwind";
import { ChevronDown, ChevronUp, XCircle } from "lucide-react";
import Order from "./Order";
import Button from "@/components/ui/Button";

interface OrderBannerContentProps {
  orderId: string;
  status: "pending" | "preparing" | "ready" | "cancelled" | "completed";
  items: { name: string; qty: number; id: string; price: number }[];
  isExpanded: boolean;
  onToggle: () => void;
  onCancelClick: () => void;
}

const getStatusMessage = (status: string) => {
  switch (status) {
    case "pending":
      return "Thank you for your order!";
    case "preparing":
      return "Your meal is being prepared!";
    case "ready":
      return "Your order is ready!";
    default:
      return "Your order";
  }
};

export default function OrderBannerContent({
  orderId,
  status,
  items,
  isExpanded,
  onToggle,
  onCancelClick,
}: OrderBannerContentProps) {
  return (
    <div
      className={cn("fixed top-15 z-10 w-full text-orange-900", {
        "bg-orange-300": status === "pending",
        "bg-fuchsia-300": status === "preparing",
        "bg-lime-300": status === "ready",
      })}
    >
      <div className="border-b border-orange-900/20 px-4 py-3">
        <h2 className="text-center text-lg font-bold">
          {getStatusMessage(status)}
        </h2>
      </div>

      <section className="flex flex-col items-center space-y-1 px-4 py-2 font-bold">
        <p className="text-sm">Order: {orderId}</p>
        <p className="text-sm capitalize">Status: {status}</p>
      </section>

      {isExpanded && (
        <div className="space-y-3 px-4 pb-3">
          {/* Order Items */}
          <div className="space-y-2">
            {items.map((item, i) => (
              <Order key={i} title={item.name} qty={item.qty} />
            ))}
          </div>

          {/* Cancel Button */}
          {status === "pending" && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={onCancelClick}
                className="group flex items-center gap-2 border-orange-600 text-orange-900 hover:bg-orange-600 hover:text-white"
              >
                <XCircle
                  size={18}
                  className="transition-transform group-hover:rotate-90"
                />
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      )}

      <section className="flex flex-col items-center pb-1">
        <button
          onClick={onToggle}
          className="rounded-full p-1 transition-all hover:bg-orange-900/10"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </section>
    </div>
  );
}
