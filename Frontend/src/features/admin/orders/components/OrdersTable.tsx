import { useState } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, type SortingState, useReactTable } from "@tanstack/react-table";
import { Label } from "@/components/ui";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { Order } from "../types";

type OrderTableProps = {
    data: Order[]
    onSelect: (order: Order) => void
}

const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderNumber",
        header: "Order",
        enableSorting: true
    },
    {
        accessorKey: "customer",
        header: "Customer",
        cell: ({getValue}) => {
            const value = getValue<string>()
            return (
                <span>{value}</span>
            )
        }
    },
    {
        accessorKey: "totalPrice",
        header: "Total",
        cell: ({getValue}) => {
            const value = getValue<number>();
            return <span>{value} SEK</span>
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ getValue }) => {
            const value = getValue<string>()
            const date = new Date(value)
            return (
                <span>
                    {date.toLocaleDateString()}
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({getValue}) => {
            const status =  getValue<Order["status"]>()
            const color = status === "pending" ? "orange" : status === "preparing" ? "purple" : "green"
            return (
                <span>
                    <Label variant={color}>{status}</Label>
                </span>
            )
        }
    }
]

function OrdersTable({data, onSelect}: OrderTableProps) {
const [ sorting, setSorting ] = useState<SortingState>([])

const table = useReactTable({
    data,
    columns,
    state: {
        sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
})
  return (
    <table className="w-full border border-stone-500">
        <thead className="">
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    const isSorted = header.column.getIsSorted()
                    return (
                        <th key={header.id} className="" onClick={header.column.getToggleSortingHandler()}>
                            <div className="bg-stone-800 text-white font-semibold flex items-center cursor-pointer p-1 border-x border-stone-500 ">
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {isSorted === "asc" && <ChevronUp size={20} color="white"/> }
                                {isSorted === "desc" && <ChevronDown size={20} color="white"/>}
                            </div>
                        </th>
                    )
})}
            </tr>
        ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map((row, index) => (
                <tr key={row.id} onClick={() => onSelect(row.original)}
                className={`cursor-pointer border-2 border-stone-500 transition-all duration-200  hover:bg-sky-100 ${index % 2 === 0 ? "bg-stone-200" : "bg-stone-100"}`}
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
  )
}

export default OrdersTable