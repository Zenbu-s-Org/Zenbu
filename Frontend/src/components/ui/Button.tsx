type ButtonVariant = "primary" | "secondary" | "submit" | "outline" | "link";
type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "bg-lime-300 hover:bg-lime-200",
    link: "bg-sky-200 hover:bg-sky-100",
    submit: "bg-orange-300 hover:bg-orange-200",
    outline: "bg-transparent hover:bg-stone-200",
  };

  const variantStyle = variants[variant];

  return (
    <button
      className={`shadow-custom cursor-pointer rounded-2xl border-3 border-stone-900 px-4 py-1 text-xl font-bold shadow-[5px_5px_0_#1c1917] transition-all duration-300 ease-in-out hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
