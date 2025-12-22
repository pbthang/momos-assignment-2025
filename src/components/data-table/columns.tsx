import type { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type SelectOption = {
  name: string;
  color: string;
};

export type DataRecord = {
  title: string;
  checkbox: boolean;
  date: Date;
  multiSelect: SelectOption[];
  number: number;
  richText: string;
  select: SelectOption | null;
  timestamp: Date;
  status: SelectOption | null;
};

export const columns: ColumnDef<DataRecord>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} title="Title" />,
    cell: ({ row }) => <span>{row.original.title}</span>,
  },
  {
    accessorKey: "checkbox",
    header: ({ column }) => <SortableHeader column={column} title="Checkbox" />,
    cell: ({ row }) => <Checkbox checked={row.original.checkbox} disabled />,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span>
        {Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(row.original.date)}
      </span>
    ),
  },
  {
    accessorKey: "multiSelect",
    header: "Multi Select",
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
    header: ({ column }) => <SortableHeader column={column} title="Number" />,
    cell: ({ row }) => (
      <span>{Intl.NumberFormat().format(row.original.number)}</span>
    ),
  },
  {
    accessorKey: "richText",
    header: "Rich Text",
    cell: ({ row }) => <span>{row.original.richText}</span>,
  },
  {
    accessorKey: "select",
    header: "Select",
    cell: ({ row }) => {
      const color = row.original.select?.color || "gray";
      return <ColorBadge color={color} label={row.original.select?.name} />;
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <SortableHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <span>
        {Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(row.original.timestamp)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const color = row.original.status?.color || "gray";
      return <ColorBadge color={color} label={row.original.status?.name} />;
    },
  },
];

const ColorBadge: React.FC<{ color: string; label?: string }> = ({
  color,
  label,
}) => {
  color = color === "default" ? "gray" : color;
  return (
    <Badge
      style={{
        borderColor: `color-mix(in srgb, ${color} 70%, black)`,
        color: `color-mix(in srgb, ${color} 70%, black)`,
        backgroundColor: `color-mix(in srgb, ${color} 10%, white)`,
      }}
    >
      {label || "N/A"}
    </Badge>
  );
};

const SortableHeader: React.FC<{
  column: Column<DataRecord, any>;
  title: string;
}> = ({ column, title }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      {column.getIsSorted() === "asc"
        ? " 🔼"
        : column.getIsSorted() === "desc"
        ? " 🔽"
        : ""}
    </Button>
  );
};
