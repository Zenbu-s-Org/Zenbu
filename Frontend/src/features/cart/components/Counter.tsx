import { Plus, Minus } from "lucide-react";
import { useCart } from "../hooks/useCart";

type CounterProps = {
  id: string;
};

function Counter({ id }: CounterProps) {
  const { increaseQty, decreaseQty, items } = useCart();
  const item = items.find((i) => i.id === id);

  return (
    <div className="flex w-full items-center justify-between rounded-md bg-stone-200 p-1 text-xl">
      <span className="font-bold">{item?.name}</span>
      <div className="flex items-center gap-3 p-1">
        <button
          className="rounded-full bg-stone-900"
          onClick={() => decreaseQty(id)}
        >
          <Minus color="white" size={30} />
        </button>
        <span className="rounded-md bg-white p-1">{item?.qty}</span>
        <button
          className="rounded-full bg-stone-900"
          onClick={() => increaseQty(id)}
        >
          <Plus color="white" size={30} />
        </button>
      </div>
    </div>
  );
}

export default Counter;
