type LabelVariant = "green" | "orange" | "purple" | "sky" | "gray"
type LabelProps = {
    children: React.ReactNode
    variant: LabelVariant
    className?: string
}


function Label({children, variant, className}: LabelProps) {

    const variants = {
        purple: "bg-fuchsia-300 border-fuchsia-900 text-fuchsia-900",
        green: "bg-lime-300 border-lime-900 text-lime-900",
        orange: "bg-orange-300 border-orange-900 text-orange-900",
        sky: "bg-sky-200 border-blue-800 text-blue-800",
        gray: "bg-stone-50 border-stone-400 text-stone-500"
    }

    const style = variants[variant]
    return (
    <div className={`border-3 rounded-xl px-2 py-1 font-bold ${style} ${className} `}>
        {children}
    </div>
  )
}

export default Label