import { Plus, Minus } from "lucide-react"
import { useCart } from "../hooks/useCart"

type CounterProps = {
  id: string
}

function Counter({id}: CounterProps) {
  const {increaseQty, decreaseQty, items} = useCart()
  const item = items.find(i => i.id === id)


  return (
    <div className="w-full flex items-center bg-stone-200 rounded-md justify-between text-xl p-1">
      <span className="font-bold">{item?.name}</span>
      <div className="flex items-center gap-3 p-1">
        <button className="bg-stone-900 rounded-full"
        onClick={() => decreaseQty(id)}
        ><Minus color="white" size={30}/></button>
        <span className="bg-white p-1 rounded-md">{item?.qty}</span>
        <button className="bg-stone-900 rounded-full"
        onClick={() => increaseQty(id)}
        ><Plus color="white" size={30}/></button>
      </div>
    </div>
  )
}

export default Counter