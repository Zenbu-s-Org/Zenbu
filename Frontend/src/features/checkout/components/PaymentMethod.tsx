import { useCheckout } from "../hooks/useCheckout";

const methods = [
  { id: "swish", label: "Swish" },
  { id: "card", label: "Card" },
  { id: "cash", label: "Cash" },
];

function PaymentMethod() {
  const { setPaymentMethod } = useCheckout();

  function handleChange(value: string) {
    setPaymentMethod(value);
  }
  return (
    <div className="flex w-full flex-col gap-4">
      {methods.map((m) => (
        <label key={m.id} htmlFor={m.id} className="flex">
          <input
            type="radio"
            id={m.id}
            name="payment"
            value={m.id}
            onChange={() => handleChange(m.id)}
            className="peer sr-only"
          />
          <span className="w-full rounded-lg border-3 border-stone-300 bg-stone-200 px-3 py-1 text-center text-xl font-bold text-stone-600 peer-checked:border-lime-800 peer-checked:bg-lime-300 peer-checked:text-lime-800">
            {m.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export default PaymentMethod;
