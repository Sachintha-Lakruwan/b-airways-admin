"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

const AdminPanel = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Date Selection and Search */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    {/* <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)} // Updated to handle Date | null
                        dateFormat="MM/dd/yyyy"
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                        placeholderText="Select date"
                    /> */}
                </div>
                <div className="flex flex-col items-center">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    {/* <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)} // Updated to handle Date | null
                        dateFormat="MM/dd/yyyy"
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                        placeholderText="Select date"
                    /> */}
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Search
                </button>
            </div>

            {/* Booking Counts */}
            <div className="grid grid-cols-2 gap-6">
                {/* Guest Section */}
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                    <h3 className="text-2xl font-semibold">Guest</h3>
                    <p className="mt-2 text-2xl font-bold">11</p>
                    <p className="mt-2 text-2xl font-bold">bookings</p>
                </div>

                {/* Registered Section */}
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-2xl font-semibold text-center mb-4">Registered</h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg text-center bg-white">
                            <h4 className="text-md font-semibold">New</h4>
                            <p className="mt-1 text-lg font-bold">0</p>
                            <p className="mt-1 text-xs font-bold">bookings</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg text-center bg-white">
                            <h4 className="text-md font-semibold">Frequent</h4>
                            <p className="mt-1 text-lg font-bold">69</p>
                            <p className="mt-1 text-xs font-bold">bookings</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg text-center bg-white">
                            <h4 className="text-md font-semibold">Gold</h4>
                            <p className="mt-1 text-lg font-bold">99</p>
                            <p className="mt-1 text-xs font-bold">bookings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;