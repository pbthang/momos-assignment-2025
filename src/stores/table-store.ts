import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SortingState, ColumnSizingState } from "@tanstack/react-table";

interface TableState {
  // Sorting state
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
  resetSorting: () => void;

  // Column order state
  columnOrder: string[];
  setColumnOrder: (
    columnOrder: string[] | ((prev: string[]) => string[])
  ) => void;
  resetColumnOrder: (defaultOrder: string[]) => void;

  // Column sizing state
  columnSizing: ColumnSizingState;
  setColumnSizing: (sizing: ColumnSizingState) => void;
  resetColumnSizing: () => void;
}

export const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      // Sorting state
      sorting: [],
      setSorting: (sorting) => set({ sorting }),
      resetSorting: () => set({ sorting: [] }),

      // Column order state
      columnOrder: [],
      setColumnOrder: (columnOrder) =>
        set((state) => ({
          columnOrder:
            typeof columnOrder === "function"
              ? columnOrder(state.columnOrder)
              : columnOrder,
        })),
      resetColumnOrder: (defaultOrder) => set({ columnOrder: defaultOrder }),

      // Column sizing state
      columnSizing: {},
      setColumnSizing: (sizing) => set({ columnSizing: sizing }),
      resetColumnSizing: () => set({ columnSizing: {} }),
    }),
    {
      name: "table-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
