import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

type DataTableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  onSelect: (row: T) => void;
};

function DataTable<T extends object>({data, columns, onSelect}: DataTableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

 return (
    <table className="w-full border border-stone-500">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isSorted = header.column.getIsSorted();
              return (
                <th key={header.id}>
                  <div
                    className="bg-stone-800 text-white font-semibold flex items-center cursor-pointer p-1 border-x border-stone-500"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {isSorted === "asc" ? <ChevronUp size={15}/> : isSorted === "desc" ? <ChevronDown size={15}/> : <ChevronsUpDown size={15}/>}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            onClick={() => onSelect(row.original)}
            className={`cursor-pointer border-2 border-stone-500 transition-all duration-200 hover:bg-sky-100 ${
              index % 2 === 0 ? "bg-stone-50" : "bg-stone-200"
            }`}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-1 border-x border-stone-500">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable