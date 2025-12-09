import { Input } from "@/components/ui"
import { useState } from "react"
import { testData } from "./testData"
import OrdersTable from "./components/OrdersTable"
import Modal from "../components/Modal"
import type { Order } from "./types"

function OrdersPage() {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selected, setSelected ] = useState<Order | null>(null)
  const [open, setOpen ] = useState<boolean>(false)

const handleClick = (e) => { 
  setSelected(e)
  setOpen(true)
}

  return (
    
    <div className="flex flex-col items-center w-full px-3 gap-3">
    <h1>Orders</h1>
      <Input label="search" placeholder="order ID or name" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <section className="w-full px-3">
        <OrdersTable 
        data={testData}
        onSelect={handleClick}
        />
      </section>
      <Modal onClose={() => setOpen(false)} open={open}>
        <span>{selected?.orderNumber}</span>
      </Modal>
   </div>
  
  )
}

export default OrdersPage