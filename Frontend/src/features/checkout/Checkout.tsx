import CartDisplay from "./components/CartDisplay";
import PaymentMethod from "./components/PaymentMethod";
import PaymentButtons from "./components/PaymentButtons";

function OrderPage() {
  // funktion för att kolla om det är en guest eller inloggad

  return (
    <>
      <section className="w-full text-center">
        <h1 className="my-3">Your Order</h1>
        <CartDisplay />
      </section>
      <section className="flex w-full flex-col items-center gap-3">
        <h2>Payment Method</h2>
        <PaymentMethod />
      </section>
      <section className="flex w-full flex-col items-center gap-3">
        <PaymentButtons />
      </section>
      <a href="/menu" className="text-xl font-semibold underline">
        {" "}
        Go Back
      </a>
    </>
  );
}

export default OrderPage;
