import { useState } from "react";
import type { FilterType } from "@/types/filter-types";
import { NestedFilter } from "./nested-filter";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { createDefaultFilterItem } from "./filter-utils";
import { useFilterStore } from "@/stores/filter-store";

export default function Filter<T extends Record<string, unknown>>({
  columnDefs,
  value,
  onChange,
  onApply,
  data,
}: {
  columnDefs: ColumnDef<T>[];
  value: FilterType<T>;
  onChange: (value?: FilterType<T>) => void;
  onApply: (value?: FilterType<T>) => void;
  data?: T[];
}) {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const resetFilter = useFilterStore((state) => state.resetFilter);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(value);
  };

  const handleReset = () => {
    const defaultFilter = createDefaultFilterItem<T>();
    onChange(defaultFilter);
    onApply();
    setValidationErrors([]);
    resetFilter();
  };

  return (
    <form onSubmit={handleApply} className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold mb-2">Filter Configuration</h2>
        <NestedFilter
          columnDefs={columnDefs}
          filter={value}
          onChange={onChange}
          data={data}
        />
      </div>
      {validationErrors.length > 0 && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 p-2">
          <p className="text-xs font-semibold text-destructive mb-1">
            Validation Errors:
          </p>
          <ul className="text-xs text-destructive list-disc list-inside space-y-0.5">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 pt-2">
        <Button type="button" onClick={handleReset} variant="outline">
          Reset Filter
        </Button>
        <Button type="submit" variant="default">
          Apply Filter
        </Button>
      </div>
    </form>
  );
}
