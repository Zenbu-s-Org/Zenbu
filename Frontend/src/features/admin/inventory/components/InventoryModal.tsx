import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { useModal } from "@/components/modal";
import type { Ingredient } from "../../types";

type Props = {
  mode: "edit" | "create";
  item?: Ingredient;
  onSave: (
    payload: Ingredient | Omit<Ingredient, "_id" | "id">,
    mode: "edit" | "create"
  ) => Promise<void> | void;
};

const CATEGORIES = [
  "base",
  "protein",
  "veg",
  "sauce",
  "drink",
  "extra",
] as const;

function InventoryModal({ mode, item, onSave }: Props) {
  const { closeModal } = useModal();

  const [name, setName] = useState(item?.name ?? "");
  const [qty, setQty] = useState<number>(item?.qty ?? 0);
  const [category, setCategory] = useState<Ingredient["category"]>(
    item?.category ?? "base"
  );

  function handleSubmit() {
    if (mode === "edit" && item) {
      const updated: Ingredient = {
        ...item,
        name,
        qty,
        category,
      };
      onSave(updated, "edit");
    } else {
      const newItem: Omit<Ingredient, "_id" | "id"> = {
        name,
        qty,
        category,
      };
      onSave(newItem, "create");
    }

    closeModal();
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-bold">
        {mode === "edit" ? "Edit Ingredient" : "Add Ingredient"}
      </h2>

      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ingredient Name"
      />

      <Input
        label="Quantity"
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        placeholder="Quantity"
      />

      <label className="font-semibold">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Ingredient["category"])}
        className="border p-1 rounded"
      >
        {CATEGORIES.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>

      <Button variant="submit" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
}

export default InventoryModal;
