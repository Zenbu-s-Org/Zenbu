import { useState } from "react";
import { type MenuItem } from "@/features/menu";

const allCategories = ["bowl", "drink"];

const categoryTitles: Record<string, string> = {
  "bowl": "Signature Bowls",
  "drink": "Drinks",
};

type CategoryFilterProps = {
    items: MenuItem[];
    onChange: (items: MenuItem[]) => void;
}

function CategoryFilter({ items, onChange }: CategoryFilterProps) {
    const [selectedCategories, setSelectedCategories] = useState(allCategories);

    const toggleCategory = (category: string) => {
        const newSelected = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(newSelected);
        onChange(items.filter(item => newSelected.includes(item.category)));
    };

  return (
    <div className="flex flex-col gap-2">
        <h3 className="text-lg">Category:</h3>
        {allCategories.map(category => (
            <label key={category} className="flex">
                <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mr-2 w-5 h-5 accent-red-500"
                />
                <span className="text-base font-['Bricolage_Grotesque']">{categoryTitles[category]}</span>
            </label>
        ))}
    </div>
  )
}

export default CategoryFilter