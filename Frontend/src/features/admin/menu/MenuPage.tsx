import MenuTable from "./components/MenuTable"
import { useFetch } from "@/hooks/useFetch"
import { type MenuItem } from "@/features/menu";


function MenuPage() {
  const {data} = useFetch<MenuItem[]>("/menu") 

  if(!data) return null

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1>Menu</h1>
      <section className="w-full px-3">
      <MenuTable data={data} onSelect={(item) => console.log(item) }/>

      </section>
   </div>
  )
}

export default MenuPage