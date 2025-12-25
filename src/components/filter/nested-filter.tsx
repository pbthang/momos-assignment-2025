import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { FilterType, FilterItemType } from "@/types/filter-types";
import { FilterItem } from "./filter-item";
import { createDefaultFilterItem } from "./filter-utils";
import type { ColumnDef } from "@tanstack/react-table";

export function NestedFilter<T extends Record<string, unknown>>({
  columnDefs,
  filter,
  level = 0,
  defaultOpen = true,
  onChange,
  path = [],
  onDelete,
  canDelete = true,
  data,
}: {
  columnDefs: ColumnDef<T>[];
  filter: FilterType<T>;
  level?: number;
  defaultOpen?: boolean;
  onChange?: (newFilter: FilterType<T>) => void;
  path?: number[];
  onDelete?: () => void;
  canDelete?: boolean;
  data?: T[];
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Base case: it's a filter item
  if ("comparator" in filter) {
    const handleFilterItemChange = (newFilter: FilterItemType<T>) => {
      if (onChange) {
        onChange(newFilter);
      }
    };
    const handleToggleToOperator = () => {
      if (onChange) {
        // Convert condition to operator: wrap current filter in an operator group
        onChange({
          operator: "and",
          filters: [filter as FilterItemType<T>, createDefaultFilterItem()],
        });
      }
    };
    return (
      <FilterItem
        columnDefs={columnDefs}
        filter={filter as FilterItemType<T>}
        level={level}
        onChange={handleFilterItemChange}
        onDelete={onDelete}
        canDelete={canDelete}
        onToggleToOperator={handleToggleToOperator}
        data={data}
      />
    );
  }

  // Recursive case: it's a nested filter with operator
  const { operator, filters } = filter;

  const handleOperatorChange = (newOperator: "and" | "or") => {
    if (onChange) {
      onChange({
        ...filter,
        operator: newOperator,
      });
    }
  };

  const handleSubFilterChange = (
    index: number,
    newSubFilter: FilterType<T>
  ) => {
    if (onChange) {
      const updatedFilters = [...filters];
      updatedFilters[index] = newSubFilter;
      onChange({
        ...filter,
        filters: updatedFilters,
      });
    }
  };

  const handleToggleToCondition = () => {
    if (onChange && filters.length > 0) {
      // Convert operator to condition: extract the first filter
      // If the first filter is an operator, we can't convert it
      // So we just take the first filter as-is
      onChange(filters[0]);
    }
  };

  const handleAddCondition = () => {
    if (onChange) {
      onChange({
        ...filter,
        filters: [...filters, createDefaultFilterItem()],
      });
    }
  };

  const handleDeleteFilter = (index: number) => {
    if (onChange && filters.length > 2) {
      const updatedFilters = filters.filter((_, i) => i !== index);
      onChange({
        ...filter,
        filters: updatedFilters,
      });
    }
  };

  const canDeleteFilter = filters.length > 2;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div style={{ paddingLeft: `${level * 12}px` }}>
        <Card className="p-2">
          <CardHeader className="px-0 py-0">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-xs">
                    {isOpen ? "▼" : "▶"}
                  </Button>
                </CollapsibleTrigger>
                <div className="flex items-center gap-1.5 mr-2">
                  <span className="text-xs text-muted-foreground">
                    Operator:
                  </span>
                  <Select value={operator} onValueChange={handleOperatorChange}>
                    <SelectTrigger className="text-xs font-semibold uppercase px-1.5 py-0 border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="and">AND</SelectItem>
                      <SelectItem value="or">OR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddCondition}
                  className="text-xs"
                  title="Add condition"
                >
                  <Plus className="size-3 mr-1" />
                  Add Condition
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1.5"
                  title="Convert this operator group to a single condition"
                >
                  <Label
                    htmlFor={`operator-switch-${level}-${
                      path?.join("-") ?? "root"
                    }`}
                    className="text-xs text-muted-foreground"
                  >
                    Operator
                  </Label>
                  <Switch
                    id={`operator-switch-${level}-${path?.join("-") ?? "root"}`}
                    checked={true}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        handleToggleToCondition();
                      }
                    }}
                    size="sm"
                  />
                </div>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    disabled={!canDelete}
                    className="h-6 w-6 text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="">
              <div className="space-y-1">
                {filters.map((subFilter, index) => (
                  <NestedFilter
                    columnDefs={columnDefs}
                    key={index}
                    filter={subFilter}
                    level={level + 1}
                    defaultOpen={true}
                    onChange={(newFilter) =>
                      handleSubFilterChange(index, newFilter)
                    }
                    onDelete={() => handleDeleteFilter(index)}
                    canDelete={canDeleteFilter}
                    path={[...path, index]}
                    data={data}
                  />
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </div>
    </Collapsible>
  );
}
