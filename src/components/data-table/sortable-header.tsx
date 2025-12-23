import type { DataRecord } from "./columns";
import type { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

const SortableHeader: React.FC<{
    column: Column<DataRecord, unknown>;
    title: string;
    sortingDisabled?: boolean;
}> = ({ column, title, sortingDisabled }) => {
    return (
        <Button
            variant={"ghost"}
            onClick={() =>
                !sortingDisabled &&
                column.toggleSorting(column.getIsSorted() === "asc")
            }
        >
            {title}
            {sortingDisabled ? null : column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-1" />
            ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-1" />
            ) : (
                <ArrowUpDown className="ml-1" />
            )}
        </Button>
    );
};

export default SortableHeader;
