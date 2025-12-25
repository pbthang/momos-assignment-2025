import type { FilterType } from "@/types/filter-types";
import { NestedFilter } from "./nested-filter";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { createDefaultFilterItem } from "./filter-utils";

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
  const handleApply = () => {
    onApply(value);
  };

  const handleReset = () => {
    onChange(createDefaultFilterItem<T>());
    onApply();
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold mb-2">Filter Configuration</h2>
        <NestedFilter
          columnDefs={columnDefs}
          filter={value}
          onChange={onChange}
          data={data}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={handleReset} variant="outline">
          Reset Filter
        </Button>
        <Button onClick={handleApply} variant="default">
          Apply Filter
        </Button>
      </div>
    </div>
  );
}
