import MenuList from "@/features/menu/components/MenuList"
import useMenuItems from "@/features/menu/hooks/useMenuItems"

function MenuPage() {
    const { menuItems } = useMenuItems();
  return (
    <section className="flex flex-col items-center bg-stone-100">
        <MenuList items={menuItems} />
    </section>
  )
}

export default MenuPage