import { flexRender, type Header } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";
import { TableHead } from "../ui/table";
import { Button } from "../ui/button";
import { GripVertical } from "lucide-react";
import { ColumnResizer } from "./column-resizer";

const DraggableTableHeader = <TValue,>({
    header,
}: {
    header: Header<TValue, unknown>;
}) => {
    const { attributes, isDragging, listeners, setNodeRef, transform } =
        useSortable({
            id: header.column.id,
        });

    const style: CSSProperties = {
        opacity: isDragging ? 0.6 : 1,
        position: "relative",
        transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
        whiteSpace: "nowrap",
        width: header.getSize(),
        zIndex: isDragging ? 1 : 0,
    };

    return (
        <TableHead
            colSpan={header.colSpan}
            ref={setNodeRef}
            style={style}
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
