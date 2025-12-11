import InventoryTable from "./components/InventoryTable";
import type { Ingredient } from "@/features/buildyourbowl";
import { useModal } from "@/components/modal";
import InventoryModal from "./components/InventoryModal";
import { useFetch } from "@/hooks/useFetch";

function InventoryPage() {
  const { openModal } = useModal();
  const { data } = useFetch<Ingredient[]>("/ingredients");
  if (!data) return null;

  return (
    <div className="flex flex-col items-center w-full px-3 gap-3">
      <h1>Inventory</h1>
      <section className="w-full px-3">
        <InventoryTable
          data={data}
          onSelect={(item) => openModal(<InventoryModal ingredient={item} />)}
        />
      </section>
    </div>
  );
}

export default InventoryPage;
