import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Code2, Filter as FilterIcon, Plus } from "lucide-react";
import type {
  FilterType,
  FilterItemType,
  ComparatorType,
  CheckboxComparator,
  NumberComparator,
  DateComparator,
  TimestampComparator,
  MultiSelectComparator,
  RichTextComparator,
} from "@/types/filter-types";
import type { DataRecord } from "@/components/data-table/columns";
import {
  CHECKBOX_COMPARATORS,
  DATE_COMPARATORS,
  MULTI_SELECT_COMPARATORS,
  NUMBER_COMPARATORS,
  RICH_TEXT_COMPARATORS,
  SELECT_COMPARATORS,
  STATUS_COMPARATORS,
  TIMESTAMP_COMPARATORS,
} from "@/types/filter-types";

function formatComparator(comparator: string): string {
  return comparator
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getComparatorsForProperty(
  property: keyof DataRecord
): readonly ComparatorType[] {
  switch (property) {
    case "checkbox":
      return CHECKBOX_COMPARATORS;
    case "date":
      return DATE_COMPARATORS;
    case "timestamp":
      return TIMESTAMP_COMPARATORS;
    case "number":
      return NUMBER_COMPARATORS;
    case "richText":
      return RICH_TEXT_COMPARATORS;
    case "multiSelect":
      return MULTI_SELECT_COMPARATORS;
    case "select":
      return SELECT_COMPARATORS;
    case "status":
      return STATUS_COMPARATORS;
    default:
      return RICH_TEXT_COMPARATORS;
  }
}

function getPropertyType(property: keyof DataRecord): string {
  switch (property) {
    case "checkbox":
      return "boolean";
    case "date":
    case "timestamp":
      return "date";
    case "number":
      return "number";
    case "multiSelect":
      return "array";
    case "richText":
    case "select":
    case "status":
    default:
      return "string";
  }
}

function createDefaultFilterItem(): FilterItemType {
  return {
    property: "richText",
    comparator: RICH_TEXT_COMPARATORS[0],
    value: "",
  };
}

function FilterItem({
  filter,
  level = 0,
  onChange,
  onDelete,
  canDelete = true,
  onToggleToOperator,
}: {
  filter: FilterItemType;
  level?: number;
  onChange?: (newFilter: FilterItemType) => void;
  onDelete?: () => void;
  canDelete?: boolean;
  onToggleToOperator?: () => void;
}) {
  const propertyType = getPropertyType(filter.property);
  const availableComparators = getComparatorsForProperty(filter.property);
  const availableProperties: (keyof DataRecord)[] = [
    "checkbox",
    "date",
    "multiSelect",
    "number",
    "richText",
    "select",
    "timestamp",
    "status",
  ];

  const handlePropertyChange = (newProperty: string) => {
    if (!onChange) return;
    const prop = newProperty as keyof DataRecord;
    const newComparators = getComparatorsForProperty(prop);
    const newType = getPropertyType(prop);

    // Create a new filter with default values for the new property type
    let newFilter: FilterItemType;
    if (newType === "boolean") {
      newFilter = {
        property: prop,
        comparator: newComparators[0] as CheckboxComparator,
        value: false,
      };
    } else if (newType === "number") {
      newFilter = {
        property: prop,
        comparator: newComparators[0] as NumberComparator,
        value: 0,
      };
    } else if (newType === "date") {
      newFilter = {
        property: prop,
        comparator: newComparators[0] as DateComparator | TimestampComparator,
        value: new Date(),
      };
    } else if (newType === "array") {
      newFilter = {
        property: prop,
        comparator: newComparators[0] as MultiSelectComparator,
        value: [],
      };
    } else {
      newFilter = {
        property: prop,
        comparator: newComparators[0] as RichTextComparator,
        value: "",
      };
    }

    onChange(newFilter);
  };

  const handleComparatorChange = (newComparator: string) => {
    if (!onChange) return;
    // Type assertion is safe because we only show valid comparators for the property
    onChange({
      ...filter,
      comparator: newComparator as typeof filter.comparator,
    } as FilterItemType);
  };

  const handleValueChange = (newValue: unknown) => {
    if (!onChange) return;
    onChange({
      ...filter,
      value: newValue as typeof filter.value,
    } as FilterItemType);
  };

  const renderValueInput = () => {
    const comparatorsThatDontNeedValue = ["is_empty", "is_not_empty"];
    if (comparatorsThatDontNeedValue.includes(filter.comparator)) {
      return (
        <span className="text-xs text-muted-foreground italic">
          (no value needed)
        </span>
      );
    }

    if (propertyType === "boolean") {
      return (
        <Checkbox
          checked={filter.value as boolean}
          onCheckedChange={(checked) => handleValueChange(checked === true)}
        />
      );
    }
    if (propertyType === "number") {
      return (
        <Input
          type="number"
          value={filter.value as number}
          onChange={(e) =>
            handleValueChange(Number.parseFloat(e.target.value) || 0)
          }
          className="h-6 w-20 text-xs"
        />
      );
    }
    if (propertyType === "date") {
      const dateValue =
        filter.value instanceof Date
          ? filter.value.toISOString().split("T")[0]
          : "";
      return (
        <Input
          type="date"
          value={dateValue}
          onChange={(e) => handleValueChange(new Date(e.target.value))}
          className="h-6 w-32 text-xs"
        />
      );
    }
    if (propertyType === "array") {
      return (
        <Input
          type="text"
          value={(filter.value as string[]).join(", ")}
          onChange={(e) =>
            handleValueChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="comma-separated values"
          className="h-6 w-40 text-xs"
        />
      );
    }
    return (
      <Input
        type="text"
        value={filter.value as string}
        onChange={(e) => handleValueChange(e.target.value)}
        className="h-6 w-32 text-xs"
      />
    );
  };

  return (
    <div style={{ paddingLeft: `${level * 12}px` }}>
      <Card className="px-0! py-0!">
        <CardContent className="px-2 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Select
                value={String(filter.property)}
                onValueChange={handlePropertyChange}
              >
                <SelectTrigger className="h-6 w-24 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableProperties.map((prop) => (
                    <SelectItem key={prop} value={prop}>
                      {prop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filter.comparator}
                onValueChange={handleComparatorChange}
              >
                <SelectTrigger className="h-6 w-32 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableComparators.map((comp) => (
                    <SelectItem key={comp} value={comp}>
                      {formatComparator(comp)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground">=</span>
              {renderValueInput()}
            </div>
            <div className="flex items-center gap-1">
              {onToggleToOperator && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleToOperator}
                  className="text-xs"
                  title="Convert to operator"
                >
                  <Code2 className="size-3 mr-1" />
                  Operator
                </Button>
              )}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NestedFilter({
  filter,
  level = 0,
  defaultOpen = true,
  onChange,
  path = [],
  onDelete,
  canDelete = true,
}: {
  filter: FilterType;
  level?: number;
  defaultOpen?: boolean;
  onChange?: (newFilter: FilterType) => void;
  path?: number[];
  onDelete?: () => void;
  canDelete?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen && level === 0);

  // Base case: it's a filter item
  if ("comparator" in filter) {
    const handleFilterItemChange = (newFilter: FilterItemType) => {
      if (onChange) {
        onChange(newFilter);
      }
    };
    const handleToggleToOperator = () => {
      if (onChange) {
        // Convert condition to operator: wrap current filter in an operator group
        onChange({
          operator: "and",
          filters: [filter as FilterItemType, createDefaultFilterItem()],
        });
      }
    };
    return (
      <FilterItem
        filter={filter as FilterItemType}
        level={level}
        onChange={handleFilterItemChange}
        onDelete={onDelete}
        canDelete={canDelete}
        onToggleToOperator={handleToggleToOperator}
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

  const handleSubFilterChange = (index: number, newSubFilter: FilterType) => {
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
                  Add
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleToCondition}
                  className="text-xs"
                  title="Convert to condition"
                >
                  <FilterIcon className="size-3 mr-1" />
                  Condition
                </Button>
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
                    key={index}
                    filter={subFilter}
                    level={level + 1}
                    defaultOpen={false}
                    onChange={(newFilter) =>
                      handleSubFilterChange(index, newFilter)
                    }
                    onDelete={() => handleDeleteFilter(index)}
                    canDelete={canDeleteFilter}
                    path={[...path, index]}
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

export default function Filter({
  value,
  onChange,
}: {
  value: FilterType;
  onChange?: (value: FilterType) => void;
}) {
  return (
    <div className="p-3 space-y-2">
      <div>
        <h2 className="text-sm font-semibold mb-2">Filter Configuration</h2>
        <NestedFilter filter={value} onChange={onChange} />
      </div>
    </div>
  );
}
