import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ColorBadge from "../color-badge";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import type { FilterItemType } from "@/types/filter-types";
import {
  formatComparator,
  getComparatorsForProperty,
  getPropertyType,
} from "./filter-utils";
import type {
  CheckboxComparator,
  NumberComparator,
  DateComparator,
  TimestampComparator,
  MultiSelectComparator,
  RichTextComparator,
} from "@/types/filter-types";
import type { ColumnDef } from "@tanstack/react-table";

type SelectOption = {
  name: string;
  color: string;
};

export function FilterItem<T extends Record<string, unknown>>({
  columnDefs,
  filter,
  level = 0,
  onChange,
  onDelete,
  canDelete = true,
  onToggleToOperator,
  data,
}: {
  columnDefs: ColumnDef<T>[];
  filter: FilterItemType<T>;
  level?: number;
  onChange?: (newFilter: FilterItemType<T>) => void;
  onDelete?: () => void;
  canDelete?: boolean;
  onToggleToOperator?: () => void;
  data?: T[];
}) {
  const propertyType = getPropertyType(filter.property);
  const availableComparators = getComparatorsForProperty(filter.property);
  const availableProperties = columnDefs.map((col) => col.id);

  // Memoize options for select and status properties
  const selectOptions = useMemo(() => {
    if (!data) return [];
    const options = new Map<string, SelectOption>();
    data.forEach((item) => {
      const value = item["select" as keyof T];
      if (
        value !== null &&
        value !== undefined &&
        typeof value === "object" &&
        "name" in value &&
        "color" in value &&
        typeof (value as SelectOption).name === "string" &&
        typeof (value as SelectOption).color === "string"
      ) {
        const option = value as SelectOption;
        if (option.name && !options.has(option.name)) {
          options.set(option.name, option);
        }
      }
    });
    return Array.from(options.values());
  }, [data]);

  const statusOptions = useMemo(() => {
    if (!data) return [];
    const options = new Map<string, SelectOption>();
    data.forEach((item) => {
      const value = item["status" as keyof T];
      if (
        value !== null &&
        value !== undefined &&
        typeof value === "object" &&
        "name" in value &&
        "color" in value &&
        typeof (value as SelectOption).name === "string" &&
        typeof (value as SelectOption).color === "string"
      ) {
        const option = value as SelectOption;
        if (option.name && !options.has(option.name)) {
          options.set(option.name, option);
        }
      }
    });
    return Array.from(options.values());
  }, [data]);

  // Memoize options for multiSelect property
  const multiSelectOptions = useMemo(() => {
    if (!data) return [];
    const options = new Map<string, SelectOption>();
    data.forEach((item) => {
      const value = item["multiSelect" as keyof T];
      if (Array.isArray(value)) {
        value.forEach((option) => {
          if (
            option &&
            typeof option === "object" &&
            "name" in option &&
            "color" in option &&
            typeof option.name === "string" &&
            typeof option.color === "string" &&
            option.name &&
            !options.has(option.name)
          ) {
            options.set(option.name, option);
          }
        });
      }
    });
    return Array.from(options.values());
  }, [data]);

  const handlePropertyChange = (newProperty: keyof T) => {
    if (!onChange) return;
    const prop = newProperty;
    const newComparators = getComparatorsForProperty(prop);
    const newType = getPropertyType(prop);

    // Create a new filter with default values for the new property type
    let newFilter: FilterItemType<T>;
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
    } as FilterItemType<T>);
  };

  const handleValueChange = (newValue: unknown) => {
    if (!onChange) return;
    onChange({
      ...filter,
      value: newValue as typeof filter.value,
    } as FilterItemType<T>);
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
          required
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
          required
        />
      );
    }
    if (propertyType === "array" && filter.property === "multiSelect" && data) {
      const selectedValues = (filter.value as string[]) || [];
      return (
        <MultiSelect
          values={selectedValues}
          onValuesChange={(values) => handleValueChange(values)}
        >
          <MultiSelectTrigger className="h-6 min-w-40 text-xs max-w-sm">
            <MultiSelectValue
              placeholder="Select options..."
              overflowBehavior="cutoff"
            />
          </MultiSelectTrigger>
          <MultiSelectContent search={false}>
            {multiSelectOptions.length > 0 ? (
              multiSelectOptions.map((option) => (
                <MultiSelectItem
                  key={option.name}
                  value={option.name}
                  badgeLabel={
                    <ColorBadge color={option.color} label={option.name} />
                  }
                >
                  <ColorBadge color={option.color} label={option.name} />
                </MultiSelectItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                No options available
              </div>
            )}
          </MultiSelectContent>
        </MultiSelect>
      );
    }
    // Handle select and status properties with badge display
    if (
      (filter.property === "select" || filter.property === "status") &&
      data
    ) {
      const options =
        filter.property === "select" ? selectOptions : statusOptions;
      const selectedOption = options.find(
        (opt) => opt.name === (filter.value as string)
      );
      return (
        <Select
          value={(filter.value as string) || ""}
          onValueChange={(value) => {
            // Always trigger change, even if it's the same value
            // This allows reselecting the same option
            handleValueChange(value);
          }}
          required
        >
          <SelectTrigger className="h-6 min-w-32 text-xs relative px-2">
            <SelectValue
              placeholder="Select..."
              className={selectedOption ? "hidden" : ""}
            >
              {selectedOption ? selectedOption.name : undefined}
            </SelectValue>
            {selectedOption && (
              <div className="absolute inset-0 flex items-center mx-2">
                <ColorBadge
                  color={selectedOption.color}
                  label={selectedOption.name}
                />
              </div>
            )}
          </SelectTrigger>
          <SelectContent>
            {options.length > 0 ? (
              options.map((option) => (
                <SelectItem
                  key={option.name}
                  value={option.name}
                  onClick={() => {
                    // Allow reselecting the same option by manually triggering change
                    const currentValue = (filter.value as string) || "";
                    if (currentValue === option.name) {
                      // If clicking the same option, force a re-render by clearing and setting
                      handleValueChange("");
                      // Use setTimeout to ensure the clear happens before setting the new value
                      setTimeout(() => {
                        handleValueChange(option.name);
                      }, 0);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ColorBadge color={option.color} label={option.name} />
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-xs text-muted-foreground">
                No options available
              </div>
            )}
          </SelectContent>
        </Select>
      );
    }
    return (
      <Input
        type="text"
        value={filter.value as string}
        onChange={(e) => handleValueChange(e.target.value)}
        className="w-32 text-xs"
        required
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
                required
              >
                <SelectTrigger className="h-6 w-24 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableProperties.map((prop) => (
                    <SelectItem key={String(prop)} value={String(prop)}>
                      {String(prop)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filter.comparator}
                onValueChange={handleComparatorChange}
                required
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
            <div className="flex items-center gap-2">
              {onToggleToOperator && (
                <div
                  className="flex items-center gap-1.5"
                  title="Convert this condition to an operator group"
                >
                  <Label
                    htmlFor={`condition-switch-${String(
                      filter.property
                    )}-${level}`}
                    className="text-xs text-muted-foreground"
                  >
                    Condition
                  </Label>
                  <Switch
                    id={`condition-switch-${String(filter.property)}-${level}`}
                    checked={false}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onToggleToOperator();
                      }
                    }}
                    size="sm"
                  />
                </div>
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
