import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useEffect, useState } from "react";

type ButtonProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CartButton({ setOpen }: ButtonProps) {
  const { getTotalqty } = useCart();
  const total = getTotalqty();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (total === 0) return;

    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 350);

    return () => clearTimeout(t);
  }, [total]);

  return (
    <button
      className={`fixed right-3 bottom-20 z-5 p-1 transition-transform duration-350 ${ animate ? "scale-110" : "scale-100" }`}
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
