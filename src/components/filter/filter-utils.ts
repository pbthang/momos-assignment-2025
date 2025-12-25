import type {
  FilterItemType,
  ComparatorType,
  RichTextComparator,
} from "@/types/filter-types";
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

export function formatComparator(comparator: string): string {
  return comparator.split("_").join(" ");
}

export function getComparatorsForProperty<T>(
  property: keyof T
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
    case "title":
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

export function getPropertyType<T>(property: keyof T): string {
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

export function createDefaultFilterItem<
  T extends Record<string, unknown>
>(): FilterItemType<T> {
  return {
    property: "title",
    comparator: RICH_TEXT_COMPARATORS[0] as RichTextComparator,
    value: "" as string,
  };
}
