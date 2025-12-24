//checkbox , date , multi_select , number , rich_text ,select , timestamp , status

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

export type FilterItemType =
    | {
          comparator:
              | (typeof MULTI_SELECT_COMPARATORS)[number]
              | (typeof RICH_TEXT_COMPARATORS)[number]
              | (typeof SELECT_COMPARATORS)[number]
              | (typeof STATUS_COMPARATORS)[number];
          property: string;
          value: string;
      }
    | {
          comparator: (typeof CHECKBOX_COMPARATORS)[number];
          property: string;
          value: boolean;
      }
    | {
          comparator:
              | (typeof DATE_COMPARATORS)[number]
              | (typeof TIMESTAMP_COMPARATORS)[number];
          property: string;
          value: Date;
      }
    | {
          comparator: (typeof NUMBER_COMPARATORS)[number];
          property: string;
          value: number;
      };

export type FilterType =
    | FilterItemType
    | {
          operator: "and" | "or";
          filters: FilterType[];
      };
