
type ButtonVariant = "primary" | "secondary" | "submit" | "outline" | "link"
type ButtonProps = {
    children: React.ReactNode,
    variant?: ButtonVariant,
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>


function Button({children, className, variant = "primary", ...props}: ButtonProps) {

const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
  secondary: "bg-lime-300 hover:bg-lime-200",
  link: "bg-sky-200 hover:bg-sky-100",
  submit: "bg-orange-300 hover:bg-orange-200",
  outline: "bg-transparent hover:bg-stone-200",
};

const variantStyle = variants[variant]

  return (
    <button className={`
        border-3 rounded-2xl px-4 py-1 font-bold text-xl shadow-custom cursor-pointer border-stone-900 shadow-[5px_5px_0_#1c1917]
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