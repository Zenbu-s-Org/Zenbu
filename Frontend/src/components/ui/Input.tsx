type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  label,
  type,
  error,
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <div className="relative flex flex-col gap-1 p-1">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="rounded-xl border-3 border-stone-900 px-3 py-1 shadow-[5px_5px_0_#1c1917]"
      />
      <span className="absolute -top-1 left-4 bg-stone-50 px-2 text-sm font-semibold">
        {label}
      </span>
      {error && <span className="font-semibold text-red-500">{error}</span>}
    </div>
  );
}

export default Input;
