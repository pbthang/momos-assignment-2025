/* eslint-disable react-refresh/only-export-components */
import {
    type ColumnDef,
    type ColumnSizingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { ColumnResizer } from "./column-resizer";
import { useState } from "react";

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

export const DataTable2 = <TValue,>({
    columns,
    data,
}: {
    columns: ColumnDef<User, TValue>[];
    data: User[];
}) => {
    const [colSizing, setColSizing] = useState<ColumnSizingState>({});

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        onColumnSizingChange: setColSizing,
        state: {
            columnSizing: colSizing,
        },
    });

    return (
        <div className="rounded-md border">
            <Table style={{ width: table.getTotalSize() }}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        key={header.id}
                                        className="relative"
                                        style={{
                                            width: header.getSize(),
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                        <ColumnResizer header={header} />
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{
                                            width: cell.column.getSize(),
                                            minWidth:
                                                cell.column.columnDef.minSize,
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
