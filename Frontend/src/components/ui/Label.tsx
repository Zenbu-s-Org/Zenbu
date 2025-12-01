type LabelVariant = "green" | "orange" | "purple"
type LabelProps = {
    children: React.ReactNode
    variant: LabelVariant
    className?: string
}


function Label({children, variant, className}: LabelProps) {

    const variants = {
        purple: "bg-fuchsia-300 border-fuchsia-900 text-fuchsia-900",
        green: "bg-lime-300 border-lime-900 text-lime-900",
        orange: "bg-orange-300 border-orange-900 text-orange-900"
    }

    const style = variants[variant]
    return (
    <div className={`border-3 rounded-xl px-2 py-1 font-bold ${style} ${className} `}>
        {children}
    </div>
  )
}

export default Label