import type { Ingredient } from "@/features/buildyourbowl/types";

export const testIngredients: Ingredient[] = [
  // BASE
  {
    _id: "ingdb-001",
    id: "ing-001",
    name: "Rice",
    category: "base",
    qty: 120
  },
  {
    _id: "ingdb-002",
    id: "ing-002",
    name: "Noodles",
    category: "base",
    qty: 75
  },
  {
    _id: "ingdb-003",
    id: "ing-003",
    name: "Quinoa",
    category: "base",
    qty: 42
  },

  // PROTEIN
  {
    _id: "ingdb-004",
    id: "ing-004",
    name: "Chicken",
    category: "protein",
    qty: 95
  },
  {
    _id: "ingdb-005",
    id: "ing-005",
    name: "Tofu",
    category: "protein",
    qty: 30
  },
  {
    _id: "ingdb-006",
    id: "ing-006",
    name: "Beef",
    category: "protein",
    qty: 18 // 🔴 visar som low stock i tabellen
  },

  // VEG
  {
    _id: "ingdb-007",
    id: "ing-007",
    name: "Edamame",
    category: "veg",
    qty: 61
  },
  {
    _id: "ingdb-008",
    id: "ing-008",
    name: "Cucumber",
    category: "veg",
    qty: 54
  },
  {
    _id: "ingdb-009",
    id: "ing-009",
    name: "Avocado",
    category: "veg",
    qty: 22 // 🔶 medium stock
  },

  // SAUCE
  {
    _id: "ingdb-010",
    id: "ing-010",
    name: "Sesame Dressing",
    category: "sauce",
    qty: 88
  },
  {
    _id: "ingdb-011",
    id: "ing-011",
    name: "Spicy Mayo",
    category: "sauce",
    qty: 46 // 🔶 medium stock
  },
  {
    _id: "ingdb-012",
    id: "ing-012",
    name: "Teriyaki",
    category: "sauce",
    qty: 12 // 🔴 low stock
  }
]