import type { DataRecord } from "@/components/data-table/columns";
import type { FilterItemType, FilterType } from "@/types/filter-types";

export const filterData = (
  data: DataRecord[],
  filter: FilterType
): DataRecord[] => {
  // base case
  if ("comparator" in filter) {
    return filterDataByComparator(data, filter as FilterItemType);
  }
  // recursive case - handle logical operators
  if (filter.operator === "and") {
    let result = [...data];
    for (const f of filter.filters as FilterType[]) {
      result = filterData(result, f);
    }
    return result;
  }
  if (filter.operator === "or") {
    const result: DataRecord[] = [];
    const seen = new Set<string>();

    for (const f of filter.filters as FilterType[]) {
      const filtered = filterData(data, f);
      for (const item of filtered) {
        const key = item.id;
        if (!seen.has(key)) {
          seen.add(key);
          result.push(item);
        }
      }
    }
    return result;
  }
  return [];
};

export const filterDataByComparator = (
  data: DataRecord[],
  comparator: FilterItemType
): DataRecord[] => {
  switch (comparator.comparator) {
    case "equals":
      return filterEquals(data, comparator.property, comparator.value);
    case "not_equals":
      return filterNotEquals(data, comparator.property, comparator.value);
    case "contains":
      return filterContains(
        data,
        comparator.property,
        comparator.value as string
      );
    case "not_contains":
      return filterDoesNotContain(
        data,
        comparator.property,
        comparator.value as string
      );
    case "is_empty":
      return filterIsEmpty(data, comparator.property);
    case "is_not_empty":
      return filterIsNotEmpty(data, comparator.property);
    case "before":
      return filterBefore(data, comparator.property, comparator.value as Date);
    case "after":
      return filterAfter(data, comparator.property, comparator.value as Date);
    case "on_or_before":
      return filterOnOrBefore(
        data,
        comparator.property,
        comparator.value as Date
      );
    case "on_or_after":
      return filterOnOrAfter(
        data,
        comparator.property,
        comparator.value as Date
      );
    case "greater_than":
      return filterGreaterThan(
        data,
        comparator.property,
        comparator.value as number
      );
    case "less_than":
      return filterLessThan(
        data,
        comparator.property,
        comparator.value as number
      );
    case "greater_than_or_equal_to":
      return filterGreaterThanOrEqualTo(
        data,
        comparator.property,
        comparator.value as number
      );
    case "less_than_or_equal_to":
      return filterLessThanOrEqualTo(
        data,
        comparator.property,
        comparator.value as number
      );
    default:
      return data;
  }
};

export const filterIsEmpty = (
  data: DataRecord[],
  property: keyof DataRecord
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] === null ||
      item[property] === undefined ||
      item[property] === "" ||
      (Array.isArray(item[property]) && item[property].length === 0)
  );
};

export const filterIsNotEmpty = (
  data: DataRecord[],
  property: keyof DataRecord
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] !== null &&
      item[property] !== undefined &&
      item[property] !== "" &&
      (!Array.isArray(item[property]) || item[property].length > 0)
  );
};

export const filterEquals = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: unknown
): DataRecord[] => {
  return data.filter((item) => {
    const itemValue = item[property];
    // Handle SelectOption objects: compare name property when value is a string
    if (
      typeof value === "string" &&
      itemValue !== null &&
      typeof itemValue === "object" &&
      "name" in itemValue
    ) {
      return itemValue.name === value;
    }
    return itemValue === value;
  });
};

export const filterNotEquals = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: unknown
): DataRecord[] => {
  return data.filter((item) => {
    const itemValue = item[property];
    // Handle SelectOption objects: compare name property when value is a string
    if (
      typeof value === "string" &&
      itemValue !== null &&
      typeof itemValue === "object" &&
      "name" in itemValue
    ) {
      return itemValue.name !== value;
    }
    return itemValue !== value;
  });
};

export const filterGreaterThan = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: number
): DataRecord[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] > value
  );
};

export const filterLessThan = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: number
): DataRecord[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] < value
  );
};

export const filterGreaterThanOrEqualTo = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: number
): DataRecord[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] >= value
  );
};

export const filterLessThanOrEqualTo = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: number
): DataRecord[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] <= value
  );
};

export const filterBefore = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: Date
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() < value.getTime()
  );
};

export const filterAfter = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: Date
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() > value.getTime()
  );
};

export const filterOnOrBefore = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: Date
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() <= value.getTime()
  );
};

export const filterOnOrAfter = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: Date
): DataRecord[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() >= value.getTime()
  );
};

export const filterContains = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: string
): DataRecord[] => {
  return data.filter((item) => {
    const itemValue = item[property];
    if (typeof itemValue === "string") return itemValue.includes(value);
    if (Array.isArray(itemValue))
      // SelectOption
      return itemValue.some(
        (arrItem) =>
          typeof arrItem === "object" &&
          "name" in arrItem &&
          arrItem.name === value
      );
    return false;
  });
};

export const filterDoesNotContain = (
  data: DataRecord[],
  property: keyof DataRecord,
  value: string
): DataRecord[] => {
  return data.filter((item) => {
    const itemValue = item[property];
    if (typeof itemValue === "string") return !itemValue.includes(value);
    if (Array.isArray(itemValue))
      return !itemValue.some(
        (arrItem) =>
          typeof arrItem === "object" &&
          "name" in arrItem &&
          arrItem.name === value
      );
    return true;
  });
};
