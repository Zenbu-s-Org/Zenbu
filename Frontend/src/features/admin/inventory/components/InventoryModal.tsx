import { Button, Input } from "@/components/ui";
import { useModal } from "@/components/modal";
import type { Ingredient } from "../../types";
import { useState } from "react";

type Props = {
  mode: "edit" | "create";
  item?: Ingredient;
  onSave: (
    item: Ingredient | Omit<Ingredient, "_id" | "id">,
    mode: "edit" | "create"
  ) => void;
  onDelete?: (id: string) => void;
};

function InventoryModal({ mode, item, onSave, onDelete }: Props) {
  const { closeModal } = useModal();

  const [name, setName] = useState(item?.name ?? "");
  const [qty, setQty] = useState(item?.qty ?? 0);
  const [category, setCategory] = useState<Ingredient["category"]>(
    item?.category ?? "base"
  );

  function handleSave() {
    if (mode === "edit" && item) {
      onSave({ ...item, name, qty, category }, "edit");
    } else {
      onSave({ name, qty, category }, "create");
    }
  }

  function handleDelete() {
    if (!item || !onDelete) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    onDelete(item.id);
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
        placeholder="Ingredient name"
      />

      <Input
        placeholder="product quantity"
        label="Quantity"
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />

      <label className="font-semibold">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Ingredient["category"])}
        className="border p-1 rounded"
      >
        <option value="base">Base</option>
        <option value="protein">Protein</option>
        <option value="veg">Vegetables</option>
        <option value="sauce">Sauce</option>
        <option value="extra">Extra</option>
      </select>

      <div className="flex justify-between mt-4">
        {mode === "edit" && (
          <Button variant="outline" onClick={handleDelete}>
            Delete
          </Button>
        )}

        <Button variant="submit" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default InventoryModal;
