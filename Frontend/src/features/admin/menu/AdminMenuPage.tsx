import { useEffect, useState, startTransition } from "react";
import { useModal } from "@/components/modal";
import { useFetch } from "@/hooks/useFetch";
import MenuTable from "./components/MenuTable";
import MenuModal from "./components/MenuModal";
import { getAuthHeaders } from "@/config/apiConfig";

import type { MenuItem } from "../types";
import { Button } from "@/components/ui";

function MenuPage() {
  const { openModal, closeModal } = useModal();

  const { data, error } = useFetch<MenuItem[]>("/menu");

  const [menu, setMenu] = useState<MenuItem[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (data && Array.isArray(data)) {
      startTransition(() => setMenu(data));
    }
  }, [data]);

  // byta till rätt url/endpoint här
  async function updateMenuItem(item: MenuItem) {
    const res = await fetch(`${API_URL}/menu/${item._id}`, {
      method: "PUT",
      headers: getAuthHeaders(true),
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      console.error("Update failed:", res.status);
      return;
    }

    const json = await res.json();
    const updated = json.product as MenuItem;

    setMenu((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));

    closeModal();
  }

  // byta till rätt url/endpoint här
  async function createMenuItem(item: Omit<MenuItem, "_id" | "id">) {
    const res = await fetch(`${API_URL}/menu`, {
      method: "POST",
      headers: getAuthHeaders(true),
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      console.error("Create failed");
      return;
    }

    const json = await res.json();
    const created = json.product as MenuItem;

    setMenu((prev) => [...prev, created]);
    closeModal();
  }

  async function handleSave(
    payload: MenuItem | Omit<MenuItem, "_id" | "id">,
    mode: "edit" | "create"
  ) {
    if (mode === "edit") {
      return updateMenuItem(payload as MenuItem);
    }
    return createMenuItem(payload as Omit<MenuItem, "_id" | "id">);
  }

  function handleRowClick(item: MenuItem) {
    console.log(item);
    openModal(<MenuModal mode="edit" item={item} onSave={handleSave} />);
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
