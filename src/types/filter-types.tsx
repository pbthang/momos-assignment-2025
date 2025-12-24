import type { DataRecord } from "@/components/data-table/columns";

export const CHECKBOX_COMPARATORS = ["equals", "not_equals"] as const;
export const DATE_COMPARATORS = [
  "equals",
  "not_equals",
  "is_empty",
  "is_not_empty",
  "before",
  "after",
  "on_or_before",
  "on_or_after",
] as const;
export const MULTI_SELECT_COMPARATORS = [
  "contains",
  "not_contains",
  "is_empty",
  "is_not_empty",
] as const;
export const NUMBER_COMPARATORS = [
  "equals",
  "not_equals",
  "is_empty",
  "is_not_empty",
  "greater_than",
  "less_than",
  "greater_than_or_equal_to",
  "less_than_or_equal_to",
] as const;
export const RICH_TEXT_COMPARATORS = [
  "equals",
  "not_equals",
  "contains",
  "not_contains",
  "is_empty",
  "is_not_empty",
] as const;
export const SELECT_COMPARATORS = [
  "equals",
  "not_equals",
  "is_empty",
  "is_not_empty",
] as const;
export const TIMESTAMP_COMPARATORS = [
  "equals",
  "not_equals",
  "is_empty",
  "is_not_empty",
  "before",
  "after",
  "on_or_before",
  "on_or_after",
] as const;
export const STATUS_COMPARATORS = [
  "equals",
  "not_equals",
  "is_empty",
  "is_not_empty",
] as const;

export type CheckboxComparator = (typeof CHECKBOX_COMPARATORS)[number];

export type MultiSelectComparator = (typeof MULTI_SELECT_COMPARATORS)[number];

export type RichTextComparator = (typeof RICH_TEXT_COMPARATORS)[number];

export type SelectComparator = (typeof SELECT_COMPARATORS)[number];

export type StatusComparator = (typeof STATUS_COMPARATORS)[number];

export type DateComparator = (typeof DATE_COMPARATORS)[number];

export type TimestampComparator = (typeof TIMESTAMP_COMPARATORS)[number];

export type NumberComparator = (typeof NUMBER_COMPARATORS)[number];

export type ComparatorType =
  | CheckboxComparator
  | MultiSelectComparator
  | RichTextComparator
  | SelectComparator
  | StatusComparator
  | DateComparator
  | TimestampComparator
  | NumberComparator;

export type TextFilterItemType = {
  comparator: RichTextComparator;
  property: keyof DataRecord;
  value: string;
};

export type CheckboxFilterItemType = {
  comparator: CheckboxComparator;
  property: keyof DataRecord;
  value: boolean;
};

export type DateFilterItemType = {
  comparator: DateComparator | TimestampComparator;
  property: keyof DataRecord;
  value: Date;
};

export type NumberFilterItemType = {
  comparator: NumberComparator;
  property: keyof DataRecord;
  value: number;
};

export type MultiSelectFilterItemType = {
  comparator: MultiSelectComparator;
  property: keyof DataRecord;
  value: string[];
};

export type SelectFilterItemType = {
  comparator: SelectComparator | StatusComparator;
  property: keyof DataRecord;
  value: string;
};

export type FilterItemType =
  | TextFilterItemType
  | CheckboxFilterItemType
  | DateFilterItemType
  | NumberFilterItemType
  | MultiSelectFilterItemType;

export type LogicalOperator = "and" | "or";

export type FilterType =
  | FilterItemType
  | { operator: LogicalOperator; filters: FilterType[] };
