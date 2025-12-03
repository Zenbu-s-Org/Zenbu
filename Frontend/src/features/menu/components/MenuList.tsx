import { type MenuItem } from "@/types/types"
import MenuCard from "./MenuCard";

type MenuListProps = {
    items: MenuItem[];
}

function MenuList({ items }: MenuListProps) {
  const categoriesToShow = ["signature-bowl", "dressing"];
  const filteredItems = items.filter(item => categoriesToShow.includes(item.category));

  const categoryTitles: Record<string, string> = {
    "signature-bowl": "Signature Bowls",
    "dressing": "Extras",
  };

  let lastCategory: string | null = null;

  return (
    <section className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredItems.map((item) => {
          const showTitle = item.category !== lastCategory;
          lastCategory = item.category;

          return (
            <>
              {showTitle && (
                <h2 key={item.category} className="col-span-full text-3xl font-bold font-['Bricolage_Grotesque'] mt-8">
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

export default MenuList