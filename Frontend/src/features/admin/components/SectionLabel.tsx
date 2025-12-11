type Props = {
  children: React.ReactNode
  label: string
}

function SectionLabel({ children, label }: Props) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <p className="uppercase font-bold text-xs text-stone-500 whitespace-nowrap">
          {label}
        </p>
        <span className="flex-1 border-b border-b-stone-500" />
      </div>
      {children}
    </div>
  )
}

export default SectionLabel