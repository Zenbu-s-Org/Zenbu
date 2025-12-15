import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui";
import type { Order } from "../../types";

type OrderTableProps = {
  data: Order[];
  onSelect: (order: Order) => void;
};

const statusColors = {
  pending: "text-orange-600",
  preparing: "text-purple-600",
  ready: "text-blue-600",
  completed: "text-green-600",
  cancelled: "text-red-600",
};

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order",
    enableSorting: true,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ getValue }) => {
    const customer = getValue<{ name?: string; phone?: string }>();
    if (!customer) return <span>Unknown</span>;
    return (
      <span>
        {customer.name ?? "No Name"} {customer.phone ? `(${customer.phone})` : ""}
      </span>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <span>{value} SEK</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const date = new Date(value);
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Order["status"]>();
      const textColor = statusColors[status];
      return (
        <span className={`font-bold uppercase ${textColor}`}>{status}</span>
      );
    },
  },
];

function OrdersTable({ data, onSelect }: OrderTableProps) {
  return <DataTable data={data} onSelect={onSelect} columns={columns} />;
}

export default OrdersTable;
