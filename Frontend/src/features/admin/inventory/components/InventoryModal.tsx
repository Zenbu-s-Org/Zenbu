import { useState } from "react"
import { Button, Input } from "@/components/ui"
import { useModal } from "@/components/modal"
import type { Ingredient } from "@/features/buildyourbowl/types"
import SectionLabel from "../../components/SectionLabel"

type Props = {
  ingredient: Ingredient
}

const CATEGORY_OPTIONS = ["base", "protein", "veg", "sauce"] as const

function InventoryModal({ ingredient }: Props) {
  const { closeModal } = useModal()

  const [name, setName] = useState(ingredient.name)
  const [qty, setQty] = useState(ingredient.qty)
  const [category, setCategory] = useState<Ingredient["category"]>(ingredient.category)

  function handleSave() {
    // TODO: PUT request till backend
    console.log("Saved:", { name, qty, category })
    closeModal()
  }

  return (
    <div className="flex flex-col items-center gap-6 ">
      <h2 className="text-xl font-bold">{ingredient.id}</h2>

        <Input
            label="Name"
          type="text"
          value={name}
          placeholder="Ingredient name"
          onChange={(e) => setName(e.target.value)}
        />
      

      <SectionLabel label="Category">
        <select
          className="border-2 border-stone-900 rounded-lg px-2 py-1 shadow-sm bg-white"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as Ingredient["category"])
          }
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="capitalize">
              {opt}
            </option>
          ))}
        </select>
      </SectionLabel>

        <Input
        label="Quantity"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          placeholder="Available quantity"
        />
      
      <div className="flex flex-col gap-5 pt-4 w-full">
        <Button variant="submit" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default InventoryModal