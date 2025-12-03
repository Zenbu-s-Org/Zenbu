import { Container } from "@/components/ui"
import CartItem from "./CartItem"
import { useCart } from "@/features/cart"

function CartDisplay() {
    const {items, getTotalPrice} = useCart()
    const total = getTotalPrice()

  return (
    <>
    <Container variant="sky" className="min-h-60 flex flex-col items-center py-3">
        {items.length < 1 ? 
        (<p>No cart found</p>) 
        : 
        (<ul className="w-full">
            {items.map((i) => (
                <li key={i.id} className="my-1">
                    <CartItem name={i.name} qty={i.qty}/>
                </li>
                ))}
        </ul>)}
            <span className="mt-auto text-2xl font-bold">{`Your Total: ${total} SEK`}</span>
        </Container>
    </>
  )
}

export default CartDisplay