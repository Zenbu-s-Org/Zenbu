type InputProps = {
    label: string,
    type: string,
    placeholder: string
    error?: string
    value: string | number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({label, type, error, value, onChange, placeholder }: InputProps) {
  return (
    <div className="relative p-1 flex flex-col gap-1">
        <input type={type} 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border-3 border-stone-900 shadow-[5px_5px_0_#1c1917] rounded-xl px-3 py-1"
        />
        <span className="absolute left-4 text-sm bg-stone-50 -top-1 px-2 font-semibold">{label}</span>
        {error && <span className="text-red-500 font-semibold">{error}</span>}
    </div>
  )
}

export default Input