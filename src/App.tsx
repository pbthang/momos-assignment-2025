import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["tableData"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}`);
      console.log("Fetched data:", response.data);
      return response.data;
    },
  });

  const tableData =
    data?.results?.map((item: any) => ({
      title: item.properties.title.title[0]?.plain_text || "",
      checkbox: item.properties.checkbox.checkbox || false,
      date: item.properties.date.date
        ? new Date(item.properties.date.date.start)
        : new Date(),
      multiSelect: item.properties.multi_select.multi_select.map((ms: any) => ({
        name: ms.name,
        color: ms.color,
      })),
      number: item.properties.number.number || 0,
      richText: item.properties.rich_text.rich_text[0]?.plain_text || "",
      select: item.properties.select.select
        ? {
            name: item.properties.select.select.name,
            color: item.properties.select.select.color,
          }
        : null,
      timestamp: item.properties.timestamp.date
        ? new Date(item.properties.timestamp.date.start)
        : new Date(),
      status: item.properties.status.status
        ? {
            name: item.properties.status.status.name,
            color: item.properties.status.status.color,
          }
        : null,
    })) || [];

  return (
    <main className="bg-background container px-4 py-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error loading data: {(error as Error).message}</p>}
      {data && <DataTable columns={columns} data={tableData} />}
    </main>
  );
}

export default App;
