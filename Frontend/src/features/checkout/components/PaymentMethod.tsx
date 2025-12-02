
const methods = [
    {id: "swish", label: "Swish"},
    {id: "card", label: "Card"},
    {id: "cash", label: "Cash"},
]

function PaymentMethod({onSelect}: { onSelect: (value: string) => void}) {

    function handleChange(value: string) {
        onSelect(value)
    }
  return (
    <div className="w-full flex flex-col gap-4">
        {methods.map((m) => (
            <label 
            key={m.id}
            htmlFor={m.id}
            className="flex"
            >
                <input 
                type="radio"
                id={m.id}
                name="payment"
                value={m.id}
                onChange={() => handleChange(m.id)}
                className="peer sr-only"
                />
                <span className="w-full px-3 py-1 rounded-lg border-3 bg-stone-200 border-stone-300 text-stone-600 text-xl font-bold text-center peer-checked:bg-lime-300 peer-checked:border-lime-800 peer-checked:text-lime-800">{m.label}</span>
            </label>        
        ))}
    </div>
  )
}

export default PaymentMethod