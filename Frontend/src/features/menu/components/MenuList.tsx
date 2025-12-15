import { type MenuItem } from "@/features/menu";
import MenuCard from "./MenuCard";

type MenuListProps = {
  items: MenuItem[] | undefined;
};

function MenuList({ items }: MenuListProps) {
  const categoryTitles: Record<string, string> = {
    bowl: "Signature Bowls",
    drink: "Drinks",
  };

  let lastCategory: string | null = null;

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items?.map((item) => {
          const showTitle = item.category !== lastCategory;
          lastCategory = item.category;

          return (
            <>
              {showTitle && (
                <h2
                  key={item.category}
                  className="col-span-full mt-8 font-['Bricolage_Grotesque'] text-3xl font-bold"
                >
                  {categoryTitles[item.category] || item.category}
                </h2>
              )}
              <MenuCard key={item._id} {...item} id={item._id} />
            </>
          );
        })}
      </div>
    </section>
  );
}

export default MenuList;
