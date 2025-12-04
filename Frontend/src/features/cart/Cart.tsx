import CartButton from "./components/CartButton"
import CartOverlay from "./components/CartOverlay"
import { useState } from "react"

function Cart() {
    const [open, setOpen] = useState<boolean>(false)

  return (
    <>
        {open && <CartOverlay setOpen={setOpen} />}
        <CartButton setOpen={setOpen} />
    </>
  )
}

export default Cart