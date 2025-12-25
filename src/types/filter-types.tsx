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

export type TextFilterItemType<T extends Record<string, unknown>> = {
  comparator: RichTextComparator;
  property: keyof T;
  value: string;
};

export type CheckboxFilterItemType<T extends Record<string, unknown>> = {
  comparator: CheckboxComparator;
  property: keyof T;
  value: boolean;
};

export type DateFilterItemType<T extends Record<string, unknown>> = {
  comparator: DateComparator | TimestampComparator;
  property: keyof T;
  value: Date;
};

export type NumberFilterItemType<T extends Record<string, unknown>> = {
  comparator: NumberComparator;
  property: keyof T;
  value: number;
};

export type MultiSelectFilterItemType<T extends Record<string, unknown>> = {
  comparator: MultiSelectComparator;
  property: keyof T;
  value: string[];
};

export type SelectFilterItemType<T extends Record<string, unknown>> = {
  comparator: SelectComparator | StatusComparator;
  property: keyof T;
  value: string;
};

export type FilterItemType<T extends Record<string, unknown>> =
  | TextFilterItemType<T>
  | CheckboxFilterItemType<T>
  | DateFilterItemType<T>
  | NumberFilterItemType<T>
  | MultiSelectFilterItemType<T>
  | SelectFilterItemType<T>;

export type LogicalOperator = "and" | "or";

export type FilterType<T extends Record<string, unknown>> =
  | FilterItemType<T>
  | { operator: LogicalOperator; filters: FilterType<T>[] };
