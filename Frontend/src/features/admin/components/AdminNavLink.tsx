import { NavLink } from "react-router-dom"

type Props = {
    to: string,
    children: React.ReactNode
}
function AdminNavLink({to, children}: Props) {
  return (
<NavLink
  to={to}
  className={({isActive}) =>`relative w-full text-center py-2 transition-all duration-300 ease-in-out ${isActive ? "text-white" : "" }`}
>
  {({ isActive }) => (
    <>
      {children}
      <span
        className={`absolute w-full left-1/2 -translate-x-1/2 -z-1 bottom-0 rounded-t-4xl h-0 bg-stone-800
          transition-all duration-300 ease-in-out
          ${isActive ? "h-full rounded-t-none" : "h-0"}`}
      />
    </>
  )}
</NavLink>
  )
}

export default AdminNavLink