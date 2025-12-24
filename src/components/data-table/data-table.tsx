import {
    type ColumnDef,
    type ColumnSizingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useCallback, useState } from "react";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
} from "@dnd-kit/sortable";
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import DraggableTableHeader from "./draggable-table-header";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTable<TValue>({
    columns,
    data,
}: {
    columns: ColumnDef<TValue>[];
    data: TValue[];
}) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.map((col) => col.id as string)
    );
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnOrderChange: setColumnOrder,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        onColumnSizingChange: setColSizing,
        defaultColumn: {
            size: 150,
            // minSize: 50,
            // maxSize: 300,
        },
        state: {
            sorting,
            columnOrder,
            columnSizing: colSizing,
        },
        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true,
    });

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setColumnOrder((columnOrder) => {
                const oldIndex = columnOrder.indexOf(active.id as string);
                const newIndex = columnOrder.indexOf(over.id as string);
                return arrayMove(columnOrder, oldIndex, newIndex);
            });
        }
    }, []);

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    );

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="flex items-center gap-2 py-4">
                <Button variant="outline" onClick={() => table.resetSorting()}>
                    Clear Sorting
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.resetColumnOrder()}
                >
                    Reset Column Order
                </Button>
                <Button
                    variant="outline"
                    onClick={() => table.resetColumnSizing()}
                >
                    Reset Column Sizing
                </Button>
            </div>
            <div className="flex items-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft /> <span>Previous</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span>Next</span> <ChevronRight />
                </Button>
            </div>
            <div className="overflow-hidden border">
                <Table
                    style={{
                        width: table.getTotalSize(),
                    }}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                <SortableContext
                                    items={columnOrder}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <DraggableTableHeader
                                                key={header.id}
                                                header={header}
                                            />
                                        );
                                    })}
                                </SortableContext>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            // className="px-4"
                                            style={{
                                                width: cell.column.getSize(),
                                                minWidth:
                                                    cell.column.columnDef
                                                        .minSize,
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </DndContext>
    );
}
