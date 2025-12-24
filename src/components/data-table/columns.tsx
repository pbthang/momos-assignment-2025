import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import ColorBadge from "../color-badge";
import SortableHeader from "./sortable-header";

type SelectOption = {
  name: string;
  color: string;
};

export type DataRecord = {
  id: string;
  title: string;
  checkbox: boolean;
  date: Date | null;
  multiSelect: SelectOption[];
  number: number | null;
  richText: string;
  select: SelectOption | null;
  timestamp: Date | null;
  status: SelectOption | null;
};

export const columns: ColumnDef<DataRecord>[] = [
  {
    accessorKey: "title",
    id: "title",
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    cell: ({ row }) => <span>{row.original.title.slice(0, 10)}</span>,
  },
  {
    accessorKey: "checkbox",
    id: "checkbox",
    header: ({ column }) => <SortableHeader column={column} title="Checkbox" />,
    cell: ({ row }) => <Checkbox checked={row.original.checkbox} disabled />,
  },
  {
    accessorKey: "date",
    id: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span>
        {row.original.date
          ? Intl.DateTimeFormat(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(row.original.date)
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "multiSelect",
    id: "multiSelect",
    header: ({ column }) => (
      <SortableHeader column={column} title="Multi Select" sortingDisabled />
    ),
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.multiSelect.map((option) => (
          <ColorBadge
            key={option.name}
            color={option.color}
            label={option.name}
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "number",
    id: "number",
    header: ({ column }) => <SortableHeader column={column} title="Number" />,
    cell: ({ row }) => (
      <span>
        {row.original.number
          ? Intl.NumberFormat().format(row.original.number)
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "richText",
    id: "richText",
    header: ({ column }) => (
      <SortableHeader column={column} title="Rich Text" sortingDisabled />
    ),
    cell: ({ row }) => <span>{row.original.richText}</span>,
  },
  {
    accessorKey: "select",
    id: "select",
    header: ({ column }) => <SortableHeader column={column} title="Select" />,
    sortingFn: (rowA, rowB) => {
      const selectA = rowA.original.select?.name || "";
      const selectB = rowB.original.select?.name || "";
      return selectA.localeCompare(selectB);
    },
    cell: ({ row }) => {
      const color = row.original.select?.color || "gray";
      return <ColorBadge color={color} label={row.original.select?.name} />;
    },
  },
  {
    accessorKey: "timestamp",
    id: "timestamp",
    header: ({ column }) => (
      <SortableHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.timestamp
          ? Intl.DateTimeFormat(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(row.original.timestamp)
          : ""}
      </span>
    ),
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    sortingFn: (rowA, rowB) => {
      const statusA = rowA.original.status?.name || "";
      const statusB = rowB.original.status?.name || "";
      return statusA.localeCompare(statusB);
    },
    cell: ({ row }) => {
      const color = row.original.status?.color || "gray";
      return <ColorBadge color={color} label={row.original.status?.name} />;
    },
  },
];
