import type { Ingredient } from "../../types";
import { DataTable } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";

type InventoryTableProps = {
  data: Ingredient[];
  onSelect: (ingredient: Ingredient) => void;
};

const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: true,
  },
  {
    accessorKey: "qty",
    header: "Qty",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      const color =
        value <= 20
          ? "text-red-600 font-bold"
          : value <= 50
            ? "text-orange-600 font-semibold"
            : "text-green-600";

      return <span className={color}>{value}</span>;
    },
    enableSorting: true,
  },
];

function InventoryTable({ data, onSelect }: InventoryTableProps) {
  return <DataTable data={data} columns={columns} onSelect={onSelect} />;
}

export default InventoryTable;
