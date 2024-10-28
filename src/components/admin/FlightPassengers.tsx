// src/components/admin/FlightPassengers.tsx
import { useState } from "react";

interface PassengerAgeData {
    age_group: "under_18" | "above_18";
    passenger_count: number;
}

export default function FlightPassengers() {
    const [flightCode, setFlightCode] = useState("");
    const [data, setData] = useState<PassengerAgeData[] | null>(null);

    const fetchPassengerData = async () => {
        const res = await fetch(`/api/admin/analytics/passengers/age_distribution?flight_code=${flightCode}`);
        const result: PassengerAgeData[] = await res.json();
        setData(result);
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Passenger Age Distribution by Flight</h2>
            <input
                type="text"
                placeholder="Flight Number"
                value={flightCode}
                onChange={(e) => setFlightCode(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button onClick={fetchPassengerData} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch Results</button>
            {data && (
                <div className="mt-4">
                    <p>Under 18: {data.find((d) => d.age_group === "under_18")?.passenger_count || 0}</p>
                    <p>Above 18: {data.find((d) => d.age_group === "above_18")?.passenger_count || 0}</p>
                </div>
            )}
        </div>
    );
}
