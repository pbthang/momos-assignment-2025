import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useCallback, useMemo } from "react";
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
import Filter from "../filter/filter";
import type { FilterType } from "@/types/filter-types";
import { createDefaultFilterItem } from "../filter/filter-utils";
import { filterData } from "@/utils/filter";
import { useFilterStore } from "@/stores/filter-store";
import { useTableStore } from "@/stores/table-store";
import type { DataRecord } from "./columns";

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
}: {
  columns: ColumnDef<T>[];
  data: T[];
}) {
  const defaultColumnOrder = useMemo(
    () => columns.map((col) => col.id as string),
    [columns]
  );

  const sorting = useTableStore((state) => state.sorting);
  const setSorting = useTableStore((state) => state.setSorting);
  const resetSorting = useTableStore((state) => state.resetSorting);

  const storeColumnOrder = useTableStore((state) => state.columnOrder);
  const setStoreColumnOrder = useTableStore((state) => state.setColumnOrder);
  const resetColumnOrder = useTableStore((state) => state.resetColumnOrder);

  // Initialize column order from store or default, and merge with defaults for new columns
  const columnOrder = useMemo(() => {
    if (storeColumnOrder.length === 0) {
      // If no persisted order, initialize with default and save it
      setStoreColumnOrder(defaultColumnOrder);
      return defaultColumnOrder;
    }
    // Merge with default to handle new columns
    const merged = [...defaultColumnOrder];
    storeColumnOrder.forEach((colId, index) => {
      if (merged.includes(colId)) {
        merged.splice(merged.indexOf(colId), 1);
        merged.splice(index, 0, colId);
      }
    });
    return merged;
  }, [storeColumnOrder, defaultColumnOrder, setStoreColumnOrder]);

  const columnSizing = useTableStore((state) => state.columnSizing);
  const setColumnSizing = useTableStore((state) => state.setColumnSizing);
  const resetColumnSizing = useTableStore((state) => state.resetColumnSizing);

  const filter = useFilterStore((state) => state.filter) as FilterType<T>;
  const appliedFilter = useFilterStore(
    (state) => state.appliedFilter
  ) as FilterType<T> | null;
  const setFilter = useFilterStore((state) => state.setFilter);
  const setAppliedFilter = useFilterStore((state) => state.setAppliedFilter);

  // Sync column order changes to store
  const handleColumnOrderChange = useCallback(
    (updater: string[] | ((old: string[]) => string[])) => {
      const newOrder =
        typeof updater === "function" ? updater(columnOrder) : updater;
      setStoreColumnOrder(newOrder);
    },
    [columnOrder, setStoreColumnOrder]
  );

  const filteredData = useMemo(() => {
    if (appliedFilter) {
      return filterData(data, appliedFilter);
    }
    return data;
  }, [data, appliedFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
    },
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: handleColumnOrderChange,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onColumnSizingChange: (updater) => {
      const newSizing =
        typeof updater === "function" ? updater(columnSizing) : updater;
      setColumnSizing(newSizing);
    },
    state: {
      sorting,
      columnOrder,
      columnSizing,
    },
    defaultColumn: {
      size: 200,
    },
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        const newOrder = [...columnOrder];
        const oldIndex = newOrder.indexOf(active.id as string);
        const newIndex = newOrder.indexOf(over.id as string);
        const reordered = arrayMove(newOrder, oldIndex, newIndex);
        setStoreColumnOrder(reordered);
      }
    },
    [columnOrder, setStoreColumnOrder]
  );

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
      <div className="my-2">
        <Filter
          columnDefs={columns}
          value={filter}
          onChange={(value) => {
            setFilter(
              (value || createDefaultFilterItem<T>()) as FilterType<DataRecord>
            );
          }}
          onApply={(appliedFilter) => {
            setAppliedFilter(
              (appliedFilter || null) as FilterType<DataRecord> | null
            );
          }}
          data={data}
        />
      </div>
      <div className="flex items-center gap-2 py-4">
        <Button
          variant="outline"
          onClick={() => {
            resetSorting();
            table.resetSorting();
          }}
        >
          Clear Sorting
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            resetColumnOrder(defaultColumnOrder);
            table.resetColumnOrder();
          }}
        >
          Reset Column Order
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            resetColumnSizing();
            table.resetColumnSizing();
          }}
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
        <div className="text-xs text-muted-foreground">
          {table.getPageCount() > 1 && (
            <span>
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              &ndash;
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                table.getState().pagination.pageSize}{" "}
              of {table.getRowCount()} results
            </span>
          )}
        </div>
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
                      <DraggableTableHeader key={header.id} header={header} />
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4"
                      style={{
                        width: cell.column.getSize() - 20,
                        minWidth: cell.column.columnDef.minSize,
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
