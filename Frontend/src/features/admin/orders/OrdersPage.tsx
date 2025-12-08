import { Input } from "@/components/ui"
import { useState } from "react"
import { testData } from "./testData"
import OrdersTable from "./components/OrdersTable"

function OrdersPage() {
  const [searchValue, setSearchValue] = useState<string>("")



  return (
    
    <div className="flex flex-col items-center w-full px-3 gap-3">
    <h1>Orders</h1>
      <Input label="search" placeholder="order ID or name" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <section className="w-full px-3">
        <OrdersTable data={testData} onSelect={(e) => console.log(e)}/> 
          {/* byt ut onSelect till öppna modal  */}
      </section>
   </div>
  
  )
}

export default OrdersPage