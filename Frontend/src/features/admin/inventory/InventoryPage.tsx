import { useEffect, useState, startTransition } from "react";
import { useModal } from "@/components/modal";
import InventoryTable from "./components/InventoryTable";
import InventoryModal from "./components/InventoryModal";
import type { Ingredient } from "../types";
import { Button } from "@/components/ui";

import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "./ingredient.api";

function InventoryPage() {
  const { openModal, closeModal } = useModal();

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadIngredients() {
      try {
        const data = await getIngredients();
        startTransition(() => setIngredients(data));
      } catch (err) {
        console.error(err);
        setError("Failed to load inventory.");
      } finally {
        setIsLoading(false);
      }
    }

    loadIngredients();
  }, []);

  async function handleSave(
    item: Ingredient | Omit<Ingredient, "_id" | "id">,
    mode: "edit" | "create"
  ) {
    try {
      if (mode === "edit") {
        const res = await updateIngredient(item as Ingredient);

        setIngredients((prev) =>
          prev.map((i) => (i.id === res.ingredient.id ? res.ingredient : i))
        );
      } else {
        const res = await createIngredient(
          item as Omit<Ingredient, "_id" | "id">
        );

        setIngredients((prev) => [...prev, res.ingredient]);
      }

      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteIngredient(id);
      setIngredients((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  function handleRowClick(item: Ingredient) {
    openModal(
      <InventoryModal
        mode="edit"
        item={item}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    );
  }

  function handleCreate() {
    openModal(<InventoryModal mode="create" onSave={handleSave} />);
  }

  if (isLoading) return <p>Loading inventory...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1 className="text-2xl font-bold">Inventory</h1>

      <section className="w-full flex justify-end px-3">
        <Button onClick={handleCreate}>Add Ingredient</Button>
      </section>

      <section className="w-full px-3">
        <InventoryTable data={ingredients} onSelect={handleRowClick} />
      </section>
    </div>
  );
}

export default InventoryPage;
