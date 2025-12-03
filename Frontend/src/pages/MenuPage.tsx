import CategoryFilter from "@/features/menu/components/CategoryFilter";
import MenuList from "@/features/menu/components/MenuList"
import SortButton from "@/features/menu/components/SortButton";
import useMenuItems from "@/features/menu/hooks/useMenuItems"
import { type MenuItem } from "@/types/types";
import { useState, useEffect } from "react";

function MenuPage() {
    const { menuItems } = useMenuItems();
    const [displayItems, setDisplayItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        setDisplayItems(menuItems);
    }, [menuItems]);

  return (
    <section className="flex flex-col items-center bg-stone-100">
        <div className="w-full flex flex-col items-start mt-12 pl-12 gap-4">
          <SortButton  items={displayItems} onChange={setDisplayItems} />
          <CategoryFilter items={menuItems} onChange={setDisplayItems} />
        </div>
        <MenuList items={displayItems} />
    </section>
  )
}

export default MenuPage