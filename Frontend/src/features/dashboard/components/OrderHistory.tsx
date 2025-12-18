import Container from "@/components/ui/Container";
import OrderItem from "./OrderItem";
import type { Order } from "@/features/dashboard/Types";

type OrderHistoryProps = {
  orders: Order[];
  showAll: boolean;
  setShowAll: (show: boolean) => void;
};

function OrderHistory({ orders, showAll, setShowAll }: OrderHistoryProps) {
  const displayedOrders = showAll ? orders : orders.slice(0, 3);
  const hasMoreOrders = orders.length > 3;

  return (
    <Container variant="primary">
      <div className="p-4 md:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          Previous Orders
        </h2>

        <div className="space-y-3 md:space-y-4">
          {displayedOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        {hasMoreOrders && (
          <div className="mt-6 md:mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="border-3 border-stone-900 rounded-xl px-6 py-2 md:px-8 md:py-3 font-bold text-sm md:text-base bg-stone-50 hover:bg-stone-100 transition-colors shadow-[5px_5px_0_#1c1917] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              {showAll ? "Show Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default OrderHistory;
