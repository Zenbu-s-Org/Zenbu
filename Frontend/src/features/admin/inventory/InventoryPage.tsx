import { useEffect, useState, startTransition } from "react";
import { useModal } from "@/components/modal";
import { useFetch } from "@/hooks/useFetch";
import InventoryTable from "./components/InventoryTable";
import InventoryModal from "./components/InventoryModal";
import type { Ingredient } from "../types";
import { Button } from "@/components/ui";

function InventoryPage() {
  const { openModal, closeModal } = useModal();

  const { data, error } = useFetch<Ingredient[]>("/ingredients");

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (data) {
      startTransition(() => setIngredients(data));
    }
  }, [data]);

  async function updateIngredient(item: Ingredient) {
    const res = await fetch(`${API_URL}/ingredients/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      console.error("Update failed");
      return;
    }

    const json = await res.json();
    const updated = json.ingredient as Ingredient;

    setIngredients((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );

    closeModal();
  }

  async function createIngredient(item: Omit<Ingredient, "_id" | "id">) {
    const res = await fetch(`${API_URL}/ingredients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      console.error("Create failed");
      return;
    }

    const json = await res.json();
    const created = json.ingredient as Ingredient;
    console.log(created);

    setIngredients((prev) => [...prev, created]);
    closeModal();
  }

  async function handleSave(
    item: Ingredient | Omit<Ingredient, "_id" | "id">,
    mode: "edit" | "create"
  ) {
    console.log("mode", mode);
    console.log("item", item);
    if (mode === "edit") return updateIngredient(item as Ingredient);
    return createIngredient(item as Omit<Ingredient, "_id" | "id">);
  }

  function handleRowClick(item: Ingredient) {
    openModal(<InventoryModal mode="edit" item={item} onSave={handleSave} />);
  }

  function handleCreate() {
    openModal(<InventoryModal mode="create" onSave={handleSave} />);
  }

  if (error) return <p className="text-red-600">Failed to load inventory.</p>;
  if (!data) return <p>Loading...</p>;

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
