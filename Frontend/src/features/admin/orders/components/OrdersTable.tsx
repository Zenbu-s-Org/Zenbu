import { type ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui";
import {DataTable} from "@/components/ui";

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

    return (
        <DataTable data={data} onSelect={onSelect} columns={columns}/>
    )
}

export default OrdersTable