import { Button, Container } from "@/components/ui"
import Counter from "./Counter"
import { useCart } from "../hooks/useCart"
import { useEffect } from "react"

type OverlayProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

function CartOverlay({setOpen}: OverlayProps) {
const {items, getTotalPrice} = useCart()
const totalPrice = getTotalPrice()

useEffect(() => {
  document.body.style.overflow = "hidden"
      return () => {
      document.body.style.overflow = "auto";
    };
}, [])

const handleClick = () => {
  setOpen(false)
}


  return (
    <div className="w-full fixed inset-0 bg-black/30 backdrop-blur-xs z-10 p-10 items-center pt-35 lg:px-90"
    onClick={handleClick}
    >
    <Container className="flex flex-col items-center gap-2 min-h-100 max-h-120" onClick={(e) => e.stopPropagation()}>
        <h1 className="font-bold text-2xl border-b border-b-stone-200 mb-2 w-full text-center">Your Cart</h1>
        <div className="flex flex-col overflow-y-scroll gap-5 w-full">
        {items.map(item => (
            <Counter id={item.id} key={item.id}/>
        ))}
        </div>
     <span className="mt-auto font-bold text-2xl">{`${totalPrice} SEK`}</span>
     <a href="/order">   
    <Button variant="submit" className=" mt-3">View Order</Button>
    </a>
    <button className="border-b-2 border-stone-900 text-xl px-2 my-3"
    onClick={() => setOpen(false)}
    > Close Cart </button>
    </Container>
    </div>
  )
}

export default CartOverlay