import { Checkout } from "@/features/checkout";

function OrderPage() {
  return (
    <div className="mb-15 flex w-full max-w-2xl flex-col items-center gap-10 rounded-xl px-4 md:mx-auto md:mb-40 md:border-3 md:border-stone-300 md:p-10">
      <Checkout />
    </div>
  );
}

export default OrderPage;
