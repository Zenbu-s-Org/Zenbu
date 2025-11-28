
type ButtonVariant = "primary" | "secondary" | "submit" | "outline" | "link"
type ButtonProps = {
    children: React.ReactNode,
    variant?: ButtonVariant,
} & React.ButtonHTMLAttributes<HTMLButtonElement>


function Button({children, className = "", variant = "primary", ...props}: ButtonProps) {

const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-300 border-blue-900 border-blue-900 border-blue-900 hover:bg-blue-200",
  secondary: "bg-lime-300 border-lime-900 shadow-lime-900 text-lime-900 hover:bg-lime-200",
  link: "bg-fuchsia-200 border-fuchsia-900 shadow-fuchsia-900 text-fuchsia-900 hover:bg-fuchsia-100",
  submit: "bg-orange-300 border-orange-900 shadow-orange-900 text-orange-900 hover:bg-orange-200",
  outline: "bg-transparent border-stone-900 text-stone-900 hover:bg-stone-200",
};

const variantStyle = variants[variant]

  return (
    <button className={`
        border-3 rounded-2xl px-4 py-1 font-extrabold text-xl shadow-custom cursor-pointer
        transition-all ease-in-out duration-300 hover:shadow-none hover:translate-y-1 hover:translate-x-1 
        ${variantStyle}
        ${className}`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button