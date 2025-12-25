import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FilterType } from "@/types/filter-types";
import { createDefaultFilterItem } from "@/components/filter/filter-utils";
import type { DataRecord } from "@/components/data-table/columns";

interface FilterState {
  filter: FilterType<DataRecord>;
  appliedFilter: FilterType<DataRecord> | null;
  setFilter: (filter: FilterType<DataRecord>) => void;
  setAppliedFilter: (filter: FilterType<DataRecord> | null) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      filter: createDefaultFilterItem<DataRecord>() as FilterType<DataRecord>,
      appliedFilter: null,
      setFilter: (filter) => set({ filter }),
      setAppliedFilter: (appliedFilter) => set({ appliedFilter }),
      resetFilter: () =>
        set({
          filter:
            createDefaultFilterItem<DataRecord>() as FilterType<DataRecord>,
          appliedFilter: null,
        }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
