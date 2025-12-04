import { ShoppingCart } from "lucide-react"
import { useCart } from "../hooks/useCart"

type ButtonProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}



function CartButton({setOpen}: ButtonProps) {
const {getTotalqty} = useCart()
const total = getTotalqty()

  return (
    <button className="fixed bottom-20 right-3 p-1" onClick={() => setOpen(true)}>
        <span className="bg-red-500 rounded-full px-2 py-0.5 font-semibold text-white absolute -top-2 left-1">{total}</span>
        <div className="bg-orange-300 rounded-full p-3 border-3 border-stone-900 shadow-[4px_4px_0_#1c1917]">
        <ShoppingCart strokeWidth={3} size={30}/>
        </div>
    </button>
  )
}

export default CartButton