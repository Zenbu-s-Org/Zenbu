import CategoryFilter from "@/features/menu/components/CategoryFilter";
import MenuList from "@/features/menu/components/MenuList"
import SortButton from "@/features/menu/components/SortButton";
import { type MenuItem } from "@/features/menu";
import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";

import { Cart } from "@/features/cart";
import BuildYourBowl from "@/features/buildyourbowl/BuildYourBowl";

function MenuPage() {
    const {data } = useFetch<MenuItem[]>("/menu")
    const [displayItems, setDisplayItems] = useState<MenuItem[]>([]);
    const category_order = ["signature-bowl", "dressing"];

    useEffect(() => {
      if (data) {
        const sorted = [...data].sort((a, b) =>
          category_order.indexOf(a.category) - category_order.indexOf(b.category)
        );
        setDisplayItems(sorted);
      }
    }, [data]);

  return (
    <section className="flex flex-col items-center bg-stone-100 lg:px-35">
        <Cart />
        <div className="w-full flex flex-col items-start mt-12 pl-12 gap-4">
          <SortButton  items={displayItems} onChange={setDisplayItems} />
          <CategoryFilter items={data ?? []} onChange={setDisplayItems} />
        </div>
        <MenuList items={displayItems} />
        <BuildYourBowl />
    </section>
  )
}

export default MenuPage