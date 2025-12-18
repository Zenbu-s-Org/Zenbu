import type { MenuItem } from "../types";
import { getAuthHeaders } from "@/config/apiConfig";

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`api/menu`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function createMenuItem(
  payload: Omit<MenuItem, "_id" | "id">
): Promise<MenuItem> {
  const res = await fetch(`api/menu`, {
    method: "POST",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create failed");
  const json = await res.json();
  return json.product;
}

export async function updateMenuItem(item: MenuItem): Promise<MenuItem> {
  const res = await fetch(`api/menu/${item._id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    credentials: "include",
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Update failed");
  const json = await res.json();
  return json.product;
}

export async function deleteMenuItem(id: string): Promise<void> {
  const res = await fetch(`api/menu/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Delete failed");
}
