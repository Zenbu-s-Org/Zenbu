import { Checkout } from "@/features/checkout";

function OrderPage() {
  return (
    <div className=" flex flex-col mb-15 px-4 items-center w-full gap-10 max-w-2xl md:border-3 md:border-stone-300 md:mx-auto md:mb-40 rounded-xl md:p-10  ">
        <Checkout />
    </div>
  )
}

export default OrderPage