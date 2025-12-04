import CartDisplay from "./components/CartDisplay"
import PaymentMethod from "./components/PaymentMethod"
import PaymentButtons from "./components/PaymentButtons"

function OrderPage() {
  // funktion för att kolla om det är en guest eller inloggad


  return (
    <>
        <section className="w-full text-center">
        <h1 className="my-3">Your Order</h1>
        <CartDisplay />
        </section>
        <section className="w-full flex flex-col items-center gap-3">
        <h2>Payment Method</h2>
        <PaymentMethod />
            </section>
            <section className="w-full flex flex-col items-center gap-3">
                <PaymentButtons />
            </section>
            <a href="/menu" className="underline text-xl font-semibold"> Go Back</a>
    </>
  )
}

export default OrderPage



