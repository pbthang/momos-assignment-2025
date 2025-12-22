import { useQuery } from "@tanstack/react-query";

export function App() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["exampleData"],
        queryFn: async () => {
            // Simulate fetching data
            return new Promise<string>((resolve) =>
                setTimeout(() => resolve("Fetched Data"), 1000)
            );
        },
    });

    return (
        <main className="bg-background container px-4 py-4">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div>
                Welcome to your new Remix + Tailwind CSS + TypeScript app.
            </div>
        </main>
    );
}

export default App;
