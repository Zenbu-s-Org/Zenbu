import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui"
import type { MenuItem } from "@/features/menu"

type Props = {
  data: MenuItem[] 
  onSelect: (item: MenuItem) => void
}

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
    cell: ({ getValue }) => <span>{getValue<number>()} SEK</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: true,
    cell: ({ getValue }) => {
      const category = getValue<string>()
      return (
        <span className="capitalize">
          {category}
        </span>
      )
    },
  },
]

function MenuTable({ data, onSelect }: Props) {
  return (
    <DataTable<MenuItem>
      data={data}
      columns={columns}
      onSelect={onSelect}
    />
  )
}

export default MenuTable