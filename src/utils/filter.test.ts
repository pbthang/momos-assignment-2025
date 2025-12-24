import { describe, it, expect } from "vitest";
import type { DataRecord } from "@/components/data-table/columns";
import type {
  ComparatorType,
  FilterItemType,
  FilterType,
  LogicalOperator,
} from "@/types/filter-types";
import {
  filterData,
  filterDataByComparator,
  filterIsEmpty,
  filterIsNotEmpty,
  filterEquals,
  filterNotEquals,
  filterGreaterThan,
  filterLessThan,
  filterGreaterThanOrEqualTo,
  filterLessThanOrEqualTo,
  filterBefore,
  filterAfter,
  filterOnOrBefore,
  filterOnOrAfter,
  filterContains,
  filterDoesNotContain,
} from "./filter";

// Helper function to create test data
const createTestRecord = (
  id: string,
  overrides?: Partial<DataRecord>
): DataRecord => ({
  id,
  title: `Title ${id}`,
  checkbox: false,
  date: new Date("2024-01-15"),
  multiSelect: [],
  number: 10,
  richText: "test text",
  select: null,
  timestamp: new Date("2024-01-15T12:00:00"),
  status: null,
  ...overrides,
});

describe("filterEquals", () => {
  it("should filter records where property equals value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 10 }),
    ];

    const result = filterEquals(data, "number", 10);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("should filter records where string property equals value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "hello" }),
      createTestRecord("2", { richText: "world" }),
      createTestRecord("3", { richText: "hello" }),
    ];

    const result = filterEquals(data, "richText", "hello");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("should filter records where boolean property equals value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { checkbox: true }),
      createTestRecord("2", { checkbox: false }),
      createTestRecord("3", { checkbox: true }),
    ];

    const result = filterEquals(data, "checkbox", true);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("should return empty array when no matches", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const result = filterEquals(data, "number", 99);
    expect(result).toHaveLength(0);
  });
});

describe("filterNotEquals", () => {
  it("should filter records where property does not equal value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 10 }),
    ];

    const result = filterNotEquals(data, "number", 10);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should return all records when none match the value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const result = filterNotEquals(data, "number", 99);
    expect(result).toHaveLength(2);
  });
});

describe("filterGreaterThan", () => {
  it("should filter records where number property is greater than value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 5 }),
    ];

    const result = filterGreaterThan(data, "number", 10);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should exclude non-number values", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const result = filterGreaterThan(data, "richText", 10);
    expect(result).toHaveLength(0);
  });

  it("should return empty array when no values are greater", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 5 }),
      createTestRecord("2", { number: 10 }),
    ];

    const result = filterGreaterThan(data, "number", 20);
    expect(result).toHaveLength(0);
  });
});

describe("filterLessThan", () => {
  it("should filter records where number property is less than value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 5 }),
    ];

    const result = filterLessThan(data, "number", 10);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("should return empty array when no values are less", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const result = filterLessThan(data, "number", 5);
    expect(result).toHaveLength(0);
  });
});

describe("filterGreaterThanOrEqualTo", () => {
  it("should filter records where number property is greater than or equal to value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 5 }),
    ];

    const result = filterGreaterThanOrEqualTo(data, "number", 10);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "2"]);
  });
});

describe("filterLessThanOrEqualTo", () => {
  it("should filter records where number property is less than or equal to value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
      createTestRecord("3", { number: 5 }),
    ];

    const result = filterLessThanOrEqualTo(data, "number", 10);
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });
});

describe("filterIsEmpty", () => {
  it("should filter records where property is null", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { select: null }),
      createTestRecord("2", { select: { name: "test", color: "blue" } }),
    ];

    const result = filterIsEmpty(data, "select");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should filter records where property is null", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { select: null }),
      createTestRecord("2", { select: { name: "test", color: "blue" } }),
    ];

    const result = filterIsEmpty(data, "select");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should filter records where property is empty string", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "" }),
      createTestRecord("2", { richText: "test" }),
    ];

    const result = filterIsEmpty(data, "richText");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should filter records where array property is empty", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { multiSelect: [] }),
      createTestRecord("2", {
        multiSelect: [{ name: "test", color: "blue" }],
      }),
    ];

    const result = filterIsEmpty(data, "multiSelect");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});

describe("filterIsNotEmpty", () => {
  it("should filter records where property is not empty", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "" }),
      createTestRecord("2", { richText: "test" }),
      createTestRecord("3", { richText: "" }),
      createTestRecord("4", { richText: "hello" }),
    ];

    const result = filterIsNotEmpty(data, "richText");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["2", "4"]);
  });

  it("should filter records where array property is not empty", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { multiSelect: [] }),
      createTestRecord("2", {
        multiSelect: [{ name: "test", color: "blue" }],
      }),
    ];

    const result = filterIsNotEmpty(data, "multiSelect");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });
});

describe("filterBefore", () => {
  it("should filter records where date property is before value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
      createTestRecord("2", { date: new Date("2024-01-20") }),
      createTestRecord("3", { date: new Date("2024-01-15") }),
    ];

    const result = filterBefore(data, "date", new Date("2024-01-15"));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should exclude non-date values", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
    ];

    const result = filterBefore(data, "richText", new Date("2024-01-15"));
    expect(result).toHaveLength(0);
  });
});

describe("filterAfter", () => {
  it("should filter records where date property is after value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
      createTestRecord("2", { date: new Date("2024-01-20") }),
      createTestRecord("3", { date: new Date("2024-01-15") }),
    ];

    const result = filterAfter(data, "date", new Date("2024-01-15"));
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });
});

describe("filterOnOrBefore", () => {
  it("should filter records where date property is on or before value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
      createTestRecord("2", { date: new Date("2024-01-20") }),
      createTestRecord("3", { date: new Date("2024-01-15") }),
    ];

    const result = filterOnOrBefore(data, "date", new Date("2024-01-15"));
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });
});

describe("filterOnOrAfter", () => {
  it("should filter records where date property is on or after value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
      createTestRecord("2", { date: new Date("2024-01-20") }),
      createTestRecord("3", { date: new Date("2024-01-15") }),
    ];

    const result = filterOnOrAfter(data, "date", new Date("2024-01-15"));
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["2", "3"]);
  });
});

describe("filterContains", () => {
  it("should filter records where string property contains value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "hello world" }),
      createTestRecord("2", { richText: "goodbye" }),
      createTestRecord("3", { richText: "hello there" }),
    ];

    const result = filterContains(data, "richText", "hello");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "3"]);
  });

  it("should filter records where array property contains value with matching name", () => {
    const data: DataRecord[] = [
      createTestRecord("1", {
        multiSelect: [
          { name: "option1", color: "blue" },
          { name: "option2", color: "red" },
        ],
      }),
      createTestRecord("2", {
        multiSelect: [{ name: "option3", color: "green" }],
      }),
    ];

    const result = filterContains(data, "multiSelect", "option1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should return empty array when no matches found", () => {
    const data: DataRecord[] = [createTestRecord("1", { richText: "hello" })];

    const result = filterContains(data, "richText", "xyz");
    expect(result).toHaveLength(0);
  });

  it("should return false for non-string, non-array values", () => {
    const data: DataRecord[] = [createTestRecord("1", { number: 123 })];

    const result = filterContains(data, "number", "123");
    expect(result).toHaveLength(0);
  });
});

describe("filterDoesNotContain", () => {
  it("should filter records where string property does not contain value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "hello world" }),
      createTestRecord("2", { richText: "goodbye" }),
      createTestRecord("3", { richText: "hello there" }),
    ];

    const result = filterDoesNotContain(data, "richText", "hello");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should filter records where array property does not contain value", () => {
    const data: DataRecord[] = [
      createTestRecord("1", {
        multiSelect: [
          { name: "option1", color: "blue" },
          { name: "option2", color: "red" },
        ],
      }),
      createTestRecord("2", {
        multiSelect: [{ name: "option3", color: "green" }],
      }),
    ];

    const result = filterDoesNotContain(data, "multiSelect", "option1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should return true for non-string, non-array values", () => {
    const data: DataRecord[] = [createTestRecord("1", { number: 123 })];

    const result = filterDoesNotContain(data, "number", "123");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});

describe("filterDataByComparator", () => {
  it("should handle equals comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const filter: FilterItemType = {
      comparator: "equals",
      property: "number",
      value: 10,
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle not_equals comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const filter: FilterItemType = {
      comparator: "not_equals",
      property: "number",
      value: 10,
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should handle contains comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "hello" }),
      createTestRecord("2", { richText: "world" }),
    ];

    const filter: FilterItemType = {
      comparator: "contains",
      property: "richText",
      value: "hello",
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle is_empty comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { richText: "" }),
      createTestRecord("2", { richText: "test" }),
    ];

    const filter: FilterItemType = {
      comparator: "is_empty",
      property: "richText",
      value: "",
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle greater_than comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const filter: FilterItemType = {
      comparator: "greater_than",
      property: "number",
      value: 10,
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should handle before comparator", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { date: new Date("2024-01-10") }),
      createTestRecord("2", { date: new Date("2024-01-20") }),
    ];

    const filter: FilterItemType = {
      comparator: "before",
      property: "date",
      value: new Date("2024-01-15"),
    };

    const result = filterDataByComparator(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should return original data for unknown comparator", () => {
    const data: DataRecord[] = [createTestRecord("1")];

    const filter = {
      comparator: "unknown" as unknown as ComparatorType,
      property: "number" as keyof DataRecord,
      value: 10,
    } as unknown as FilterItemType;

    const result = filterDataByComparator(data, filter);
    expect(result).toEqual(data);
  });
});

describe("filterData", () => {
  it("should handle simple FilterItemType", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const filter: FilterType = {
      comparator: "equals",
      property: "number",
      value: 10,
    };

    const result = filterData(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle AND operator with multiple filters", () => {
    const data: DataRecord[] = [
      createTestRecord("1", {
        number: 10,
        checkbox: true,
        date: new Date("2025-01-15"),
      }),
      createTestRecord("2", {
        number: 10,
        checkbox: false,
        date: new Date("2025-01-15"),
      }),
      createTestRecord("3", {
        number: 20,
        checkbox: true,
        date: new Date("2024-01-15"),
      }),
      createTestRecord("4", {
        number: 20,
        checkbox: false,
        date: new Date("2025-01-15"),
      }),
    ];

    const filter: FilterType = {
      operator: "and",
      filters: [
        {
          comparator: "equals",
          property: "number",
          value: 10,
        },
        {
          comparator: "equals",
          property: "checkbox",
          value: true,
        },
        {
          comparator: "after",
          property: "date",
          value: new Date("2024-01-16"),
        },
      ],
    };

    const result = filterData(data, filter);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle OR operator with multiple filters", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10, date: new Date("2025-01-15") }),
      createTestRecord("2", { number: 20, date: new Date("2024-01-15") }),
      createTestRecord("3", { number: 30, date: new Date("2024-01-15") }),
      createTestRecord("4", { number: 40, date: new Date("2025-01-15") }),
      createTestRecord("5", { number: 50, date: new Date("2025-01-15") }),
    ];

    const filter: FilterType = {
      operator: "or",
      filters: [
        {
          comparator: "equals",
          property: "number",
          value: 10,
        },
        {
          comparator: "equals",
          property: "number",
          value: 30,
        },
        {
          comparator: "after",
          property: "date",
          value: new Date("2024-01-16"),
        },
      ],
    };

    const result = filterData(data, filter);
    expect(result).toHaveLength(4);
    expect(result.map((r) => r.id)).toEqual(["1", "3", "4", "5"]);
  });

  it("should handle nested AND and OR operators", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10, checkbox: true }),
      createTestRecord("2", { number: 10, checkbox: false }),
      createTestRecord("3", { number: 20, checkbox: true }),
      createTestRecord("4", { number: 20, checkbox: false }),
    ];

    const filter: FilterType = {
      operator: "and",
      filters: [
        {
          comparator: "equals",
          property: "number",
          value: 10,
        },
        {
          operator: "or",
          filters: [
            {
              comparator: "equals",
              property: "checkbox",
              value: true,
            },
            {
              comparator: "equals",
              property: "number",
              value: 20,
            },
          ],
        },
      ],
    };

    const result = filterData(data, filter);
    // Should match: (number=10 AND (checkbox=true OR number=20))
    // This means: (1) or (2 with number=20, but 2 has number=10, so no match)
    // Actually: number=10 AND (checkbox=true OR number=20)
    // For number=10: checkbox=true matches (record 1)
    // For number=20: matches (record 3, 4)
    // But after AND with number=10, only record 1 matches
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("should handle OR operator with duplicate results", () => {
    const data: DataRecord[] = [
      createTestRecord("1", { number: 10 }),
      createTestRecord("2", { number: 20 }),
    ];

    const filter: FilterType = {
      operator: "or",
      filters: [
        {
          comparator: "greater_than",
          property: "number",
          value: 5,
        },
        {
          comparator: "greater_than",
          property: "number",
          value: 15,
        },
      ],
    };

    const result = filterData(data, filter);
    // Both records match both filters, but should only appear once
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(["1", "2"]);
  });

  it("should return empty array for unknown operator", () => {
    const data: DataRecord[] = [createTestRecord("1")];

    const filter = {
      operator: "unknown" as unknown as LogicalOperator,
      filters: [],
    };

    const result = filterData(data, filter);
    expect(result).toEqual([]);
  });

  it("should handle empty data array", () => {
    const data: DataRecord[] = [];

    const filter: FilterType = {
      comparator: "equals",
      property: "number",
      value: 10,
    };

    const result = filterData(data, filter);
    expect(result).toHaveLength(0);
  });

  it("should handle highly nested and complex filters", () => {
    const data: DataRecord[] = [
      createTestRecord("1", {
        number: 10,
        checkbox: true,
        richText: "hello everyone",
        select: { name: "alpha", color: "red" },
        date: new Date("2024-01-01"),
      }),
      createTestRecord("2", {
        number: 20,
        checkbox: false,
        richText: "world",
        select: { name: "beta", color: "blue" },
        date: new Date("2024-01-20"),
      }),
      createTestRecord("3", {
        number: 10,
        checkbox: false,
        richText: "greetings",
        select: { name: "gamma", color: "green" },
        date: new Date("2024-02-05"),
      }),
      createTestRecord("4", {
        number: 30,
        checkbox: true,
        richText: "hello world",
        select: { name: "alpha", color: "red" },
        date: new Date("2024-01-10"),
      }),
    ];

    // Nested filter logic:
    // OR [
    //   (AND [
    //     (number = 10),
    //     (checkbox = false),
    //     (OR [
    //       (richText contains "greetings"),
    //       (select.name = "gamma" AND date after 2024-01-31)
    //     ])
    //   ]),
    //   (AND [
    //     (checkbox = true),
    //     (richText contains "hello"),
    //     (OR [
    //       (number = 30),
    //       (date before 2024-01-05)
    //     ])
    //   ]),
    //   (AND [
    //     (select.name = "beta"),
    //     (richText contains "world")
    //   ]),
    // ]
    const filter: FilterType = {
      operator: "or",
      filters: [
        {
          operator: "and",
          filters: [
            { comparator: "equals", property: "number", value: 10 },
            { comparator: "equals", property: "checkbox", value: false },
            {
              operator: "or",
              filters: [
                {
                  comparator: "contains",
                  property: "richText",
                  value: "greetings",
                },
                {
                  operator: "and",
                  filters: [
                    {
                      comparator: "equals",
                      property: "select",
                      value: "gamma",
                    },
                    {
                      comparator: "after",
                      property: "date",
                      value: new Date("2024-01-31"),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          operator: "and",
          filters: [
            { comparator: "equals", property: "checkbox", value: true },
            { comparator: "contains", property: "richText", value: "hello" },
            {
              operator: "or",
              filters: [
                { comparator: "equals", property: "number", value: 30 },
                {
                  comparator: "before",
                  property: "date",
                  value: new Date("2024-01-05"),
                },
              ],
            },
          ],
        },
        {
          operator: "and",
          filters: [
            {
              comparator: "equals",
              property: "select",
              value: "beta",
            },
            { comparator: "contains", property: "richText", value: "world" },
          ],
        },
      ],
    };

    const result = filterData(data, filter);
    // Explanation:
    // - Record 1:
    //     - AND group 2: checkbox=true, richText contains 'hello', date=2024-01-01 < 2024-01-05: true => MATCHES.
    // - Record 2:
    //     - AND group 3: select.name="beta", richText contains "world" => MATCHES.
    // - Record 3:
    //     - AND group 1: number=10, checkbox=false, (richText contains "greetings") => MATCHES.
    // - Record 4:
    //     - AND group 2: checkbox=true, richText contains 'hello', number=30 => MATCHES.
    expect(result).toHaveLength(4);
    expect(result.map((r) => r.id).sort()).toEqual(["1", "2", "3", "4"]);
  });
});
