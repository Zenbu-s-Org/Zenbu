import { Checkout } from "@/features/checkout";

function OrderPage() {
  return (
    <div className=" min-h-screen flex flex-col px-4 items-center w-full gap-10">
        <Checkout />
    </div>
  )
}

export default OrderPage