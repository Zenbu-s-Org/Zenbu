import { type ColumnDef } from "@tanstack/react-table";
import DataTable from "@/components/ui/DataTable";
import type { MenuItem } from "../../types";

type Props = {
  data: MenuItem[];
  onSelect: (item: MenuItem) => void;
};

const columns: ColumnDef<MenuItem>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
    cell: ({ getValue }) => {
      const price = getValue<number>();
      return <span>{price} SEK</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: true,
    cell: ({ getValue }) => {
      const category = getValue<MenuItem["category"]>();
      return <span className="capitalize">{category}</span>;
    },
  },
];

function MenuTable({ data, onSelect }: Props) {
  return (
    <DataTable<MenuItem> data={data} columns={columns} onSelect={onSelect} />
  );
}

export default MenuTable;
