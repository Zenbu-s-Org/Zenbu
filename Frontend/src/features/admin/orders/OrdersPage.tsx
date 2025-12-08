import { Input } from "@/components/ui"
import { useState } from "react"


function OrdersPage() {
  const [searchValue, setSearchValue] = useState<string>("")


  return (
    
    <div className="flex flex-col items-center w-full px-3 gap-3">
    <h1>Orders</h1>
      <Input label="search" placeholder="order ID or name" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
   </div>
  
  )
}

export default OrdersPage