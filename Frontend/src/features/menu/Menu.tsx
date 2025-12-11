import { useFetch } from "@/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { type MenuItem } from "./types";
import { Cart } from "@/features/cart";
import { MenuList, CategoryFilter, SortButton } from "@/features/menu";
import { BuildYourBowl } from "@/features/buildyourbowl";
import { Button } from "@/components/ui";
import { useLocation } from "react-router-dom";

function Menu() {
    const {data } = useFetch<MenuItem[]>("/menu")
    const [displayItems, setDisplayItems] = useState<MenuItem[]>([]);
    const category_order = ["bowl", "drink"];

    const buildBowlRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    useEffect(() => {
        if (data) {
            const sorted = [...data].sort((a, b) =>
              category_order.indexOf(a.category) - category_order.indexOf(b.category)
            );
            setDisplayItems(sorted);
          }
        }, [data]);

    useEffect(() => {
      if (location.hash === "#buildbowl") {
        setTimeout(() => {
          buildBowlRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }, [location.hash]);

    const scrollToBuildBowl = () => {
        buildBowlRef.current?.scrollIntoView({ behavior: "smooth" });
    };
        
  return (
    <>
        <Cart />
        <div className="w-full flex flex-col items-start mt-12 pl-8 gap-4">
          <SortButton  items={displayItems} onChange={setDisplayItems} />
          <CategoryFilter items={data ?? []} onChange={setDisplayItems} />
        </div>
        <div className="w-full flex flex-col items-end pr-8">
            <Button variant="link" onClick={scrollToBuildBowl}>Build your own bowl</Button>
        </div>
        <MenuList items={displayItems} />
        <div id="buildbowl" ref={buildBowlRef}>
            <BuildYourBowl />
        </div>
    </>
  )
}

export default Menu