import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

type ButtonProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartButton({ setOpen }: ButtonProps) {
  const { getTotalqty } = useCart();
  const total = getTotalqty();

  return (
    <button
      className="fixed right-3 bottom-20 z-5 p-1"
      onClick={() => setOpen(true)}
    >
      <span className="absolute -top-2 left-1 rounded-full bg-red-500 px-2 py-0.5 font-semibold text-white">
        {total}
      </span>
      <div className="rounded-full border-3 border-stone-900 bg-orange-300 p-3 shadow-[4px_4px_0_#1c1917]">
        <ShoppingCart strokeWidth={3} size={30} />
      </div>
    </button>
  );
}

export default CartButton;
