
type Props = {
    children: React.ReactNode,
    label: string
}

function SectionLabel({children, label}: Props ) {
  return (
    <div className="w-full flex flex-col">
        <div className="flex items-baseline gap-1 ">
          <span className="h1 flex-1 border-b border-b-stone-500"/>
          <p className="uppercase font-bold text-xs flex-1 text-stone-500">{label}</p>
          <span className="h1 flex-5 font-bold border-b border-b-stone-500"/>
        </div>
        {children}
    </div>
  )
}

export default SectionLabel