import type { FilterItemType, FilterType } from "@/types/filter-types";

export const filterData = <T extends Record<string, unknown>>(
  data: T[],
  filter: FilterType<T>
): T[] => {
  // base case
  if ("comparator" in filter) {
    return filterDataByComparator<T>(data, filter as FilterItemType<T>);
  }
  // recursive case - handle logical operators
  if (filter.operator === "and") {
    let result = [...data];
    for (const f of filter.filters as FilterType<T>[]) {
      result = filterData(result, f);
    }
    return result;
  }
  if (filter.operator === "or") {
    const result: T[] = [];
    const seen = new Set<string>();

    for (const f of filter.filters as FilterType<T>[]) {
      const filtered = filterData(data, f);
      for (const item of filtered) {
        const key = JSON.stringify(item);
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

export const filterDataByComparator = <T extends Record<string, unknown>>(
  data: T[],
  comparator: FilterItemType<T>
): T[] => {
  switch (comparator.comparator) {
    case "equals":
      return filterEquals(data, comparator.property, comparator.value);
    case "not_equals":
      return filterNotEquals(data, comparator.property, comparator.value);
    case "contains":
      // Handle multi-select: if value is an array, check if item contains any of the values
      if (Array.isArray(comparator.value)) {
        return filterContainsMultiSelect(
          data,
          comparator.property,
          comparator.value as string[]
        );
      }
      return filterContains(
        data,
        comparator.property,
        comparator.value as string
      );
    case "not_contains":
      // Handle multi-select: if value is an array, check if item does not contain any of the values
      if (Array.isArray(comparator.value)) {
        return filterDoesNotContainMultiSelect(
          data,
          comparator.property,
          comparator.value as string[]
        );
      }
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

export const filterIsEmpty = <T>(data: T[], property: keyof T): T[] => {
  return data.filter(
    (item) =>
      item[property] === null ||
      item[property] === undefined ||
      item[property] === "" ||
      (Array.isArray(item[property]) && item[property].length === 0)
  );
};

export const filterIsNotEmpty = <T>(data: T[], property: keyof T): T[] => {
  return data.filter(
    (item) =>
      item[property] !== null &&
      item[property] !== undefined &&
      item[property] !== "" &&
      (!Array.isArray(item[property]) || item[property].length > 0)
  );
};

export const filterEquals = <T>(
  data: T[],
  property: keyof T,
  value: unknown
): T[] => {
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

export const filterNotEquals = <T>(
  data: T[],
  property: keyof T,
  value: unknown
): T[] => {
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

export const filterGreaterThan = <T>(
  data: T[],
  property: keyof T,
  value: number
): T[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] > value
  );
};

export const filterLessThan = <T>(
  data: T[],
  property: keyof T,
  value: number
): T[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] < value
  );
};

export const filterGreaterThanOrEqualTo = <T>(
  data: T[],
  property: keyof T,
  value: number
): T[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] >= value
  );
};

export const filterLessThanOrEqualTo = <T>(
  data: T[],
  property: keyof T,
  value: number
): T[] => {
  return data.filter(
    (item) => typeof item[property] === "number" && item[property] <= value
  );
};

export const filterBefore = <T>(
  data: T[],
  property: keyof T,
  value: Date
): T[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() < value.getTime()
  );
};

export const filterAfter = <T>(
  data: T[],
  property: keyof T,
  value: Date
): T[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() > value.getTime()
  );
};

export const filterOnOrBefore = <T>(
  data: T[],
  property: keyof T,
  value: Date
): T[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() <= value.getTime()
  );
};

export const filterOnOrAfter = <T>(
  data: T[],
  property: keyof T,
  value: Date
): T[] => {
  return data.filter(
    (item) =>
      item[property] instanceof Date &&
      (item[property] as Date).getTime() >= value.getTime()
  );
};

export const filterContains = <T>(
  data: T[],
  property: keyof T,
  value: string
): T[] => {
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

export const filterDoesNotContain = <T>(
  data: T[],
  property: keyof T,
  value: string
): T[] => {
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

// Filter function for multi-select contains (value is an array of strings)
export const filterContainsMultiSelect = <T>(
  data: T[],
  property: keyof T,
  values: string[]
): T[] => {
  if (values.length === 0) return data;
  return data.filter((item) => {
    const itemValue = item[property];
    if (Array.isArray(itemValue)) {
      // Check if item's multiSelect array contains ALL of the selected values
      return values.every((value) =>
        itemValue.some(
          (arrItem) =>
            typeof arrItem === "object" &&
            "name" in arrItem &&
            arrItem.name === value
        )
      );
    }
    return false;
  });
};

// Filter function for multi-select not_contains (value is an array of strings)
export const filterDoesNotContainMultiSelect = <T>(
  data: T[],
  property: keyof T,
  values: string[]
): T[] => {
  if (values.length === 0) return data;
  return data.filter((item) => {
    const itemValue = item[property];
    if (Array.isArray(itemValue)) {
      // Check if item's multiSelect array does NOT contain ANY of the selected values
      return !values.some((value) =>
        itemValue.some(
          (arrItem) =>
            typeof arrItem === "object" &&
            "name" in arrItem &&
            arrItem.name === value
        )
      );
    }
    return true;
  });
};
