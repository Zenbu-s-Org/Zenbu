import Container from "@/components/ui/Container";
import OrderItem from "./OrderItem";
import type { Order } from "@/features/dashboard/Types";

type OrderHistoryProps = {
  orders: Order[];
};

function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Container variant="primary">
      <div className="p-4">
        <h2 className="mb-4 text-center text-2xl font-bold">Previous Orders</h2>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="rounded-xl border-3 border-stone-900 bg-stone-50 px-6 py-2 font-bold shadow-[5px_5px_0_#1c1917] transition-colors hover:translate-x-1 hover:translate-y-1 hover:bg-stone-100 hover:shadow-none">
            See More
          </button>
        </div>
      </div>
    </Container>
  );
}

export default OrderHistory;
