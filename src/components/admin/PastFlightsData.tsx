// src/components/admin/PastFlightsData.tsx
import { useState } from "react";

interface PastFlightData {
    flight_code: string;
    date: string;
    status: string;
    passenger_count: number;
}

export default function PastFlightsData() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [data, setData] = useState<PastFlightData[] | null>(null);

    const fetchPastFlights = async () => {
        const res = await fetch(`/api/analytics/past_flight_data?origin=${origin}&destination=${destination}`);
        const result: PastFlightData[] = await res.json();
        setData(result);
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Past Flights by Origin and Destination</h2>
            <input
                type="text"
                placeholder="Origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button onClick={fetchPastFlights} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch Results</button>
            {data && (
                <table className="mt-4 w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Flight Code</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Passenger Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((flight, index) => (
                            <tr key={index}>
                                <td className="border p-2">{flight.flight_code}</td>
                                <td className="border p-2">{flight.date}</td>
                                <td className="border p-2">{flight.status}</td>
                                <td className="border p-2">{flight.passenger_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
