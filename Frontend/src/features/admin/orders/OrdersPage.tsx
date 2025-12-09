import { Input } from "@/components/ui"
import { useState } from "react"
import { testData } from "./testData"
import OrdersTable from "./components/OrdersTable"
import OrderModal from "./components/OrderModal"
import { useModal } from "@/components/modal"


function OrdersPage() {
  const [searchValue, setSearchValue] = useState<string>("")
  const {openModal} = useModal()

  return (
    
    <div className="flex flex-col items-center w-full px-3 gap-3">
    <h1>Orders</h1>
      <Input label="search" placeholder="order ID or name" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <section className="w-full px-3">
        <OrdersTable 
        data={testData}
        onSelect={(order) => openModal(<OrderModal order={order} />)}
        />
      </section>
   </div>
  
  )
}

export default OrdersPage