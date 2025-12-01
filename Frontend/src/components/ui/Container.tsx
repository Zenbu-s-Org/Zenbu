type ContainerVariant = "primary" | "sky" | "green" | "orange"
type ContainerProps = {
    children: React.ReactNode 
    variant?: ContainerVariant
    className?: string
}
function Container({children, className, variant = "primary" }: ContainerProps) {

    const variants = {
        primary: "bg-black",
        sky: "bg-sky-200",
        green: "bg-lime-300",
        orange: "bg-orange-300"
    }

    const shadow = variants[variant]

  return (
    <div className="relative flex">
        <div className={`border-3 border-black p-2 z-2 bg-stone-50 rounded-xl ${className}`}>
  {children}
</div>
<div className={`border-3 border-black absolute ${shadow} w-full h-full z-1 rounded-xl translate-x-2 translate-y-2`} />
    </div>

  )
}

export default Container