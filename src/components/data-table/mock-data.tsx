import type { FilterType } from "@/types/filter-types";
import type { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: number;
  email: string;
  name: string;
  age: number;
  address: string;
  language: string;
  airLine: string;
  origin: string;
  destination: string;
};

export const users = [
  {
    id: 1,
    email: "string",
    name: "string",
    age: 2,
    address: "string",
    language: "string",
    airLine: "string",
    origin: "string",
    destination: "string",
  },
  {
    id: 2,
    email: "string",
    name: "string",
    age: 3,
    address: "string",
    language: "string",
    airLine: "string",
    origin: "string",
    destination: "string",
  },
];

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "airLine",
    header: "Airline",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
];

export const mockFilter: FilterType = {
  operator: "and",
  filters: [
    {
      comparator: "equals",
      property: "checkbox",
      value: true,
    },
    {
      operator: "or",
      filters: [
        {
          comparator: "after",
          property: "date",
          value: new Date("2025-01-01"),
        },
        {
          comparator: "equals",
          property: "status",
          value: "Done",
        },
        {
          operator: "and",
          filters: [
            {
              comparator: "greater_than",
              property: "number",
              value: 100,
            },
            {
              comparator: "contains",
              property: "richText",
              value: "important",
            },
          ],
        },
      ],
    },
    {
      operator: "and",
      filters: [
        {
          comparator: "on_or_after",
          property: "timestamp",
          value: new Date("2025-01-15T10:00:00"),
        },
        {
          operator: "or",
          filters: [
            {
              comparator: "is_not_empty",
              property: "select",
              value: "",
            },
            {
              comparator: "contains",
              property: "multiSelect",
              value: ["urgent"],
            },
            {
              operator: "and",
              filters: [
                {
                  comparator: "less_than_or_equal_to",
                  property: "number",
                  value: 1000,
                },
                {
                  comparator: "before",
                  property: "date",
                  value: new Date("2025-12-31"),
                },
                {
                  comparator: "not_equals",
                  property: "checkbox",
                  value: false,
                },
              ],
            },
          ],
        },
        {
          comparator: "not_contains",
          property: "richText",
          value: "deprecated",
        },
      ],
    },
    {
      operator: "or",
      filters: [
        {
          comparator: "equals",
          property: "status",
          value: "Active",
        },
        {
          operator: "and",
          filters: [
            {
              comparator: "is_empty",
              property: "multiSelect",
              value: [],
            },
            {
              comparator: "on_or_before",
              property: "timestamp",
              value: new Date("2025-06-30T23:59:59"),
            },
          ],
        },
      ],
    },
  ],
};
