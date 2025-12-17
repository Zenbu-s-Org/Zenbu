import type { MenuItem } from "../types";
import { getAuthHeaders } from "@/config/apiConfig";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`, {
    headers: getAuthHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function createMenuItem(
  payload: Omit<MenuItem, "_id" | "id">
): Promise<MenuItem> {
  const res = await fetch(`${API_URL}/menu`, {
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
  const res = await fetch(`${API_URL}/menu/${item._id}`, {
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
  const res = await fetch(`${API_URL}/menu/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Delete failed");
}
