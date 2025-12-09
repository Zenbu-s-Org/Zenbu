
import { Button } from "@/components/ui"
import type { Order } from "../types"
import { useModal } from "@/components/modal"
import SectionLabel from "../../components/SectionLabel"
import { useState } from "react"

type Props = {
  order: Order
}

function OrderModal({order}: Props) {
const {closeModal} = useModal()
const date = new Date(order.createdAt)

console.log(order)
const [status, setStatus ] = useState(order.status)
  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h2>Order: {order.orderNumber}</h2>
      <SectionLabel label="customer"><p>{order.customer}</p></SectionLabel>
      <SectionLabel label="createdAt"><p>{date.toLocaleDateString()} | {date.toLocaleTimeString()}</p></SectionLabel>
      <SectionLabel label="payment"><p>{order.totalPrice} SEK - payed with {order.paymentMethod}</p></SectionLabel>
      <SectionLabel label="order">
                <ul className="flex flex-col w-full font-semibold gap-1">
            {order.items.map((i) => (
              <li key={i.id} className="bg-blue-50 flex flex-col p-1">
                <div className="flex gap-2">
                  <p>{i.name}</p>
                  <p>{i.qty}x</p>
                </div>
                <ul className="flex gap-1 ">
                  {i.ingredients.map((ing) => (
                    <li key={ing.id} className="">
                      <p>{ing.name},</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
      </SectionLabel>
<SectionLabel label="Status">
  <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="border-2 border-stone-600 rounded-md p-1 font-semibold mt-1"
  >
    <option value="pending">Pending</option>
    <option value="preparing">Preparing</option>
    <option value="ready">Ready</option>
  </select>
</SectionLabel>
<div className="w-full mt-10 flex flex-col gap-5">
      <Button className="w-full" variant="submit">Save</Button>
      <Button className="w-full" variant="outline" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}

export default OrderModal