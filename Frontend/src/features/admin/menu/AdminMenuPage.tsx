import { useEffect, useState, startTransition } from "react";
import { useModal } from "@/components/modal";
import { useFetch } from "@/hooks/useFetch";
import MenuTable from "./components/MenuTable";
import MenuModal from "./components/MenuModal";
import { Button } from "@/components/ui";

import type { MenuItem } from "../types";
import { createMenuItem, updateMenuItem, deleteMenuItem } from "./menu.api";

function MenuPage() {
  const { openModal, closeModal } = useModal();

  const { data, error } = useFetch<MenuItem[]>("/menu");
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (data) {
      startTransition(() => setMenu(data));
    }
  }, [data]);

  async function handleSave(
    payload: MenuItem | Omit<MenuItem, "_id" | "id">,
    mode: "edit" | "create"
  ) {
    if (mode === "edit") {
      const updated = await updateMenuItem(payload as MenuItem);
      setMenu((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
    } else {
      const created = await createMenuItem(
        payload as Omit<MenuItem, "_id" | "id">
      );
      setMenu((prev) => [...prev, created]);
    }

    closeModal();
  }

  async function handleDelete(item: MenuItem) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    if (!item._id) {
      return console.error("delete error");
    }
    await deleteMenuItem(item._id);
    setMenu((prev) => prev.filter((m) => m.id !== item.id));
    closeModal();
  }

  function handleRowClick(item: MenuItem) {
    openModal(
      <MenuModal
        mode="edit"
        item={item}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    );
  }

  function handleCreate() {
    openModal(<MenuModal mode="create" onSave={handleSave} />);
  }

  if (error) return <p className="text-red-600">Failed to load menu.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1 className="text-2xl font-bold">Menu</h1>

      <section className="w-full flex justify-end px-3">
        <Button onClick={handleCreate}>Add Product</Button>
      </section>

      <section className="w-full px-3">
        <MenuTable data={menu} onSelect={handleRowClick} />
      </section>
    </div>
  );
}

export default MenuPage;
