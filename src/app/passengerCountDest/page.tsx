"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

const AdminPanel = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [destination, setDestination] = useState<string>(""); // State for destination
    const [totalPassengers, setTotalPassengers] = useState<number>(0); // State for total passengers

    const destinations = [
        "New York",
        "Los Angeles",
        "Chicago",
        "Miami",
        "San Francisco",
        "Las Vegas",
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Date Selection, Destination, and Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    {/* <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                        placeholderText="Select date"
                    /> */}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    {/* <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                        placeholderText="Select date"
                    /> */}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Destination</label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select destination</option>
                        {destinations.map((dest) => (
                            <option key={dest} value={dest}>
                                {dest}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="mt-6 md:mt-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Search
                </button>
            </div>

            {/* Total Passengers Display */}
            <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50 text-center">
                <h3 className="text-xl font-semibold">Total Passengers</h3>
                <p className="mt-2 text-4xl font-bold">{totalPassengers}</p>
            </div>

        </div>
    );
};

export default AdminPanel;