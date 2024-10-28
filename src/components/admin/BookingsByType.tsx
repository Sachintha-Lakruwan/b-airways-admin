// src/components/admin/BookingsByType.tsx
import { useState } from "react";

interface BookingTypeData {
    loyalty_type: string;
    booking_count: number;
}

export default function BookingsByType() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [data, setData] = useState<BookingTypeData[] | null>(null);

    const fetchBookingData = async () => {
        const res = await fetch(`/api/analytics/bookings_type_count?start_date=${startDate}&end_date=${endDate}`);
        const result: BookingTypeData[] = await res.json();
        setData(result);
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Bookings by Passenger Type</h2>
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
            <button onClick={fetchBookingData} className="px-4 py-2 bg-blue-600 text-white rounded">Fetch Results</button>
            {data && (
                <table className="mt-4 w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((typeData, index) => (
                            <tr key={index}>
                                <td className="border p-2">{typeData.loyalty_type}</td>
                                <td className="border p-2">{typeData.booking_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
