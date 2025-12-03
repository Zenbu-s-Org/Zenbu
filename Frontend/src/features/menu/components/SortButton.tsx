import { Button } from "@/components/ui";
import { type MenuItem } from "@/features/menu";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

type SortButtonProps = {
    items: MenuItem[];
    onChange: (items: MenuItem[]) => void;
}

function SortButton({ items, onChange }: SortButtonProps) {
    const [sortOrder, setSortOrder] = useState<"high-to-low" | "low-to-high">("high-to-low");

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "high-to-low" ? "low-to-high" : "high-to-low";
        setSortOrder(newOrder);

        const sortedItems = items.slice().sort((a, b) =>
            newOrder === "high-to-low" ? b.price - a.price : a.price - b.price
        );
        onChange(sortedItems);
    };

  return (
    <Button variant="secondary" onClick={toggleSortOrder} className="flex gap-2">
        {sortOrder === "high-to-low" ? (
            <>
                Price: high to low
                <ArrowRightLeft />
            </>
        ) : (
            <>
                Price: low to high
                <ArrowRightLeft />
            </>
        )}
    </Button>
  )
}

export default SortButton