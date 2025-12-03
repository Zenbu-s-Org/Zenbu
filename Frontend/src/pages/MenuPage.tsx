import { useFetch } from "@/hooks/useFetch";
import { MenuList } from "@/features/menu";
import type { MenuItem } from "@/features/menu";
import { Cart } from "@/features/cart";


function MenuPage() {
  const {data } = useFetch<MenuItem[]>("/menu")

  return (
    <section className="flex flex-col items-center bg-stone-100">
        <MenuList items={data} />
        <Cart />
    </section>
  )
}

export default MenuPage