import { flexRender, type Header } from "@tanstack/react-table";
import type { DataRecord } from "./columns";
import { useSortable } from "@dnd-kit/sortable";
import { TableHead } from "../ui/table";
import { Button } from "../ui/button";
import { GripVertical } from "lucide-react";
import { ColumnResizer } from "./column-resizer";

const DraggableTableHeader = ({
    header,
}: {
    header: Header<DataRecord, unknown>;
}) => {
    const { attributes, listeners, setNodeRef } = useSortable({
        id: header.column.id,
    });

    return (
        <TableHead
            colSpan={header.colSpan}
            ref={setNodeRef}
            style={{
                width: header.getSize(),
            }}
            className={"relative"}
        >
            <div className="flex items-center justify-between">
                {header.isPlaceholder
                    ? null
                    : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                      )}
                <Button
                    {...attributes}
                    {...listeners}
                    variant={"ghost"}
                    size={"icon"}
                    className=" cursor-grab active:cursor-grabbing"
                >
                    <GripVertical />
                </Button>
            </div>
            <ColumnResizer header={header} />
        </TableHead>
    );
};

export default DraggableTableHeader;
