import InventoryTable from "./components/InventoryTable"
import { testIngredients } from "./testData"
import { useModal } from "@/components/modal"
import InventoryModal from "./components/InventoryModal"

function InventoryPage() {
  const {openModal} = useModal()

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1>Menu</h1>
      <section className="w-full px-3">
      <InventoryTable data={testIngredients} onSelect={(item) => openModal(<InventoryModal ingredient={item}/>)}/>

      </section>
   </div>
  )
}

export default InventoryPage