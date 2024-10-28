// src/components/admin/RevenueByAircraft.tsx
import { useState } from "react";

export default function RevenueByAircraft() {
    const [airplaneModel, setAirplaneModel] = useState("");
    const [revenue, setRevenue] = useState(null);

    const fetchRevenueData = async () => {
        const res = await fetch(`/api/admin/analytics/revenue?airplane_model=${airplaneModel}`);
        const result = await res.json();
        setRevenue(result.total_revenue);
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Revenue by Aircraft Type</h2>
            <input
                type="text"
                placeholder="Aircraft Model ID"
                value={airplaneModel}
                onChange={(e) => setAirplaneModel(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button onClick={fetchRevenueData} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch Results</button>
            {revenue !== null && <p className="mt-4">Total Revenue: ${revenue}</p>}
        </div>
    );
}
