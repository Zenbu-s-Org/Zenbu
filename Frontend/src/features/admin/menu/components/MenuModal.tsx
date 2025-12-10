import type { MenuItem } from "@/features/menu"
import { Button, Input } from "@/components/ui"
import { SectionLabel } from "../../components"
import { useState } from "react"
import { useModal } from "@/components/modal"

type Props = {
  data: MenuItem
}

const CATEGORY_OPTIONS = ["drink", "bowl", "extra"] as const

function MenuModal({data}: Props) {
  const {closeModal} = useModal()

  const [name, setName] = useState(data.name)
  const [desc, setDesc] = useState(data.description ?? "")
  const [price, setPrice] = useState(data.price)
  const [category, setCategory] = useState<MenuItem["category"]>(data.category)

  const handleSave = () => {
    const updatedItem: MenuItem = {
      ...data,
      name,
      description: desc,
      price,
      category,
    }
    console.log(updatedItem)
  }

  return (
    <div className="flex flex-col items-center w-full gap-10 bg-stone-50">
      <h2>{data._id}</h2>
      <div className="w-full flex flex-col gap-5">
      <Input 
        label="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
      />
      <Input 
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Product Price"
      />
      <Input 
        label="Description"
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Product Description"
      />
      </div>

            <SectionLabel label="category">
                  <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MenuItem["category"])}
          className="border-3 border-stone-900 shadow-[5px_5px_0_#1c1917] rounded-xl px-3 py-1 w-full"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.toUpperCase()}
            </option>
          ))}
        </select>
      </SectionLabel>
      <div className="w-full flex flex-col gap-3">
      <Button variant="submit" onClick={handleSave}>Save Changes</Button>
      <Button variant="outline" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}

export default MenuModal