"use client";

import React, { useState } from "react";

const AdminPanel = () => {
    const [departureAirport, setDepartureAirport] = useState<string>("");
    const [arrivalAirport, setArrivalAirport] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]); // State for search results

    const airports = [
        "JFK - New York",
        "LAX - Los Angeles",
        "ORD - Chicago",
        "MIA - Miami",
        "SFO - San Francisco",
        "LAS - Las Vegas",
    ];

    const handleSearch = () => {
        // Simulating search results
        const results = [
            { flight: "AA123", flightNumber: "AA123", date: "2024-10-30", status: "On Time", passengerCount: 150 },
            { flight: "UA456", flightNumber: "UA456", date: "2024-10-31", status: "Delayed", passengerCount: 200 },
            { flight: "DL789", flightNumber: "DL789", date: "2024-11-01", status: "Cancelled", passengerCount: 0 },
        ];
        setSearchResults(results);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Departure and Arrival Airports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Departure Airport</label>
                    <select
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Departure Airport</option>
                        {airports.map((airport) => (
                            <option key={airport} value={airport}>
                                {airport}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Arrival Airport</label>
                    <select
                        value={arrivalAirport}
                        onChange={(e) => setArrivalAirport(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Arrival Airport</option>
                        {airports.map((airport) => (
                            <option key={airport} value={airport}>
                                {airport}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search Button */}
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSearch}>
                Search
            </button>

            {/* Search Results Table */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Flight</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Flight Number</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Passenger Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{result.flight}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.flightNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.status}</td>
                                <td className="border border-gray-300 px-4 py-2">{result.passengerCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;