import { useState, useEffect } from "react";
import { getDataSales } from "../lib/services/sales";
import { askAi } from "../lib/services/ai";
import { Table } from "../components/table/table";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isAsking, setIsAsking] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataSales();
                console.log(data.salesReps, "<<<<<");
                setUsers(data.salesReps);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAskQuestion = async () => {
        if (!question.trim()) return;
        try {
            setIsAsking(true);
            const result = await askAi(question);
            setAnswer(result.answer); // adjust if your response shape differs
        } catch (err) {
            console.error("Error in AI request:", err);
            setAnswer("Something went wrong...");
        } finally {
            setIsAsking(false);
        }
    };

    const TABLE_HEADER = [
        { key: 'name', title: 'Name' },
        { key: 'role', title: 'Role' },
        { key: 'region', title: 'Region' },
        {
            key: 'skills',
            title: 'Skills',
            renderActionComponent: (data) => (
                <div className="flex gap-2">
                    {
                        data.skills.map(el => {
                            return (
                                <div className="px-2 py-1 bg-amber-200 rounded-full">
                                    {el}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Chat AI Bar */}
            <div className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-blue-600">Sales Dashboard</h1>
                <div className="flex items-center gap-2 w-1/2">
                    <input
                        type="text"
                        placeholder="Ask the AI about sales..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAskQuestion}
                        disabled={isAsking}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                    >
                        {isAsking ? "Thinking..." : "Ask"}
                    </button>
                </div>
            </div>

            {/* AI Answer */}
            {answer && (
                <div className="bg-gray-100 px-6 py-3 border-b border-gray-300">
                    <strong>AI Answer:</strong> {answer}
                </div>
            )}

            {/* Table */}
            <div className="px-6 py-6 flex-1">
                <Table
                    headerItems={TABLE_HEADER}
                    isLoading={loading}
                    list={users}
                    emptyMessage="No sales found"
                    checkboxColor="blue"
                />
            </div>
        </div>
    );
}
