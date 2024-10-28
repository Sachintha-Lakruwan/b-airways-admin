"use client";

import React, { useState } from "react";

const AgeClassification = () => {
    const [flightNumber, setFlightNumber] = useState("");

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Flight Number Search */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col items-center">
                    <label className="text-sm font-medium text-gray-700">Flight Number</label>
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter flight number"
                    />
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Search
                </button>
            </div>

            {/* Age Classification Tables */}
            <div className="grid grid-cols-2 gap-6">
                {/* Below 18 Section */}
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Below 18</h4>
                  <p className="mt-1 text-xs font-bold">First_name  Last_Name</p>
                  <p className="mt-1 text-xs font-bold">Country ID</p>
                  <p className="mt-1 text-xs font-bold">Gender Male 17</p>
                  <p className="mt-1 text-xs font-bold">Passport No 1745733</p>
                  <p className="mt-1 text-xs font-bold">NIC 2849384494</p>
                </div>

                {/* Above 18 Section */}
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  <h4 className="text-2xl font-semibold">Above 18</h4>
                  <p className="mt-1 text-lg font-bold">No Results</p>
                  
                </div>
            </div>
        </div>
    );
};

export default AgeClassification;