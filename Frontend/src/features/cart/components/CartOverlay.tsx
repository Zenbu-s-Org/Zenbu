import { Button, Container } from "@/components/ui"
import Counter from "./Counter"
import { useCart } from "../hooks/useCart"

type OverlayProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

function CartOverlay({setOpen}: OverlayProps) {
const {items, getTotalPrice} = useCart()
const totalPrice = getTotalPrice()

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 z-10">
    <Container className="flex flex-col items-center gap-2 min-h-60">
        <h1 className="font-bold text-2xl border-b border-b-stone-200 mb-2 w-full text-center">Your Cart</h1>
        {items.map(item => (
            <Counter id={item.id} key={item.id}/>
        ))}
     <span className="mt-2 font-bold text-2xl">{`${totalPrice} SEK`}</span>
     <a href="/order">   
    <Button variant="submit" className=" mb-2">View Order</Button>
    </a>
    <button className="border-b-2 border-stone-900 text-xl px-2 mb-2"
    onClick={() => setOpen(false)}
    > Close Cart </button>
    </Container>
    </div>
  )
}

export default CartOverlay