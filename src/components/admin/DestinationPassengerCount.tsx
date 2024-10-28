// src/components/admin/DestinationPassengerCount.tsx
import { useState } from "react";

export default function DestinationPassengerCount() {
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [count, setCount] = useState(null);

    const fetchPassengerCount = async () => {
        const res = await fetch(`/api/admin/analytics/passengers/destination_count?destination=${destination}&start_date=${startDate}&end_date=${endDate}`);
        const result = await res.json();
        setCount(result.passenger_count);
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Passengers to Destination by Date Range</h2>
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button onClick={fetchPassengerCount} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch Results</button>
            {count !== null && <p className="mt-4">Total Passengers: {count}</p>}
        </div>
    );
}
