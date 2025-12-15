import { apiFetch } from "../services/apiFetch";
import type { Ingredient } from "../types";

export function getIngredients() {
  return apiFetch<Ingredient[]>("/ingredients");
}

export function createIngredient(payload: Omit<Ingredient, "_id" | "id">) {
  return apiFetch<{ ingredient: Ingredient }>("/ingredients", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateIngredient(ingredient: Ingredient) {
  return apiFetch<{ ingredient: Ingredient }>(`/ingredients/${ingredient.id}`, {
    method: "PUT",
    body: JSON.stringify(ingredient),
  });
}

export function deleteIngredient(id: string) {
  return apiFetch<void>(`/ingredients/${id}`, {
    method: "DELETE",
  });
}
