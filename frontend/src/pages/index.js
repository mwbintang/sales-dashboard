import { useState, useEffect } from "react";
import { getDataSales } from "../lib/services/sales";
import { Table } from "../components/table/table";
import { toast } from "react-toastify";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataSales();
        setUsers(data.salesReps);
      } catch (error) {
        setUsers([])
        toast.error("Something went wrong...");
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const TABLE_HEADER = [
    { key: "name", title: "Name" },
    { key: "role", title: "Role" },
    { key: "region", title: "Region" },
    {
      key: "skills",
      title: "Skills",
      renderActionComponent: (data) => (
        <div className="flex gap-2">
          {data.skills.map((el) => (
            <div key={el} className="px-2 py-1 bg-amber-200 rounded-full">
              {el}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 py-6">
      <Table
        headerItems={TABLE_HEADER}
        isLoading={loading}
        list={users}
        emptyMessage="No sales found"
        checkboxColor="blue"
      />
    </div>
  );
}
