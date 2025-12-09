import Container from "@/components/ui/Container";
import OrderItem from './OrderItem';
import type { Order } from "@/features/dashboard/Types";

type OrderHistoryProps = {
  orders: Order[];
};

function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <Container variant="primary">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Previous Orders</h2>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button className="border-3 border-stone-900 rounded-xl px-6 py-2 font-bold bg-stone-50 hover:bg-stone-100 transition-colors shadow-[5px_5px_0_#1c1917] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            See More
          </button>
        </div>
      </div>
    </Container>
  );
}

export default OrderHistory;