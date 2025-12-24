import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./components/data-table/data-table";
import { columns, type DataRecord } from "./components/data-table/columns";
import type { NotionQueryResponse } from "./types/api-types";
import { useMemo } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function App() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["tableData"],
        queryFn: async () => {
            const response = await axios.get(`${BACKEND_URL}`);
            console.log("Fetched data:", response.data);
            return response.data as NotionQueryResponse;
        },
    });

    const tableData: DataRecord[] = useMemo(
        () => (data ? data.results.map(transformDTOToDataRecord) : []),
        [data]
    );

    return (
        <main className="bg-background container px-4 py-4">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            {isLoading && <p>Loading data...</p>}
            {error && <p>Error loading data: {(error as Error).message}</p>}
            {data && <DataTable columns={columns} data={tableData} />}
        </main>
    );
}

const transformDTOToDataRecord = (
    item: NotionQueryResponse["results"][number]
): DataRecord => {
    const getTitle = (): string => {
        const titleProperty = item.properties["title"];
        if (
            titleProperty &&
            titleProperty.type === "title" &&
            titleProperty.title.length > 0
        ) {
            return titleProperty.title.map((t) => t.plain_text).join("");
        }
        return "No Title";
    };
    const getCheckbox = (): boolean => {
        const checkboxProperty = item.properties["checkbox"];
        return (
            checkboxProperty?.type === "checkbox" && checkboxProperty.checkbox
        );
    };
    const getDate = (): Date => {
        const dateProperty = item.properties["date"];
        if (dateProperty?.type === "date" && dateProperty.date?.start) {
            return new Date(dateProperty.date.start);
        }
        return new Date();
    };
    const getMultiSelect = (): { name: string; color: string }[] => {
        const multiSelectProperty = item.properties["multi_select"];
        if (
            multiSelectProperty?.type === "multi_select" &&
            multiSelectProperty.multi_select.length > 0
        ) {
            return multiSelectProperty.multi_select.map((option) => ({
                name: option.name,
                color: option.color,
            }));
        }
        return [];
    };
    const getNumber = (): number => {
        const numberProperty = item.properties["number"];
        if (
            numberProperty?.type === "number" &&
            numberProperty.number !== null
        ) {
            return numberProperty.number;
        }
        return 0;
    };
    const getRichText = (): string => {
        const richTextProperty = item.properties["rich_text"];
        if (
            richTextProperty?.type === "rich_text" &&
            richTextProperty.rich_text.length > 0
        ) {
            return richTextProperty.rich_text.map((t) => t.plain_text).join("");
        }
        return "";
    };
    const getSelect = (): { name: string; color: string } | null => {
        const selectProperty = item.properties["select"];
        if (
            selectProperty?.type === "select" &&
            selectProperty.select !== null
        ) {
            return {
                name: selectProperty.select.name,
                color: selectProperty.select.color,
            };
        }
        return null;
    };
    const getTimestamp = (): Date => {
        const timestampProperty = item.properties["timestamp"];
        if (
            timestampProperty?.type === "created_time" &&
            timestampProperty.created_time
        ) {
            return new Date(timestampProperty.created_time);
        }
        return new Date();
    };
    const getStatus = (): { name: string; color: string } | null => {
        const statusProperty = item.properties["status"];
        if (
            statusProperty?.type === "status" &&
            statusProperty.status !== null
        ) {
            return {
                name: statusProperty.status.name,
                color: statusProperty.status.color,
            };
        }
        return null;
    };

    return {
        id: item.id,
        title: getTitle(),
        checkbox: getCheckbox(),
        date: getDate(),
        multiSelect: getMultiSelect(),
        number: getNumber(),
        richText: getRichText(),
        select: getSelect(),
        timestamp: getTimestamp(),
        status: getStatus(),
    };
};

export default App;
