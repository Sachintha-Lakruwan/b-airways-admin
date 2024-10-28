"use client"
// Navbar.tsx
import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js

const Navbar = ({ children }) => {
    // Define the topics and their corresponding URLs
    const topics = [
        { name: "VIEW PASSENGERS BY AGE", path: "/passengersByAge" },
        { name: "PASSENGER COUNT BY DESTINATION", path: "/passengerCountDest" },
        { name: "BOOKINGS BY PASSENGER TYPE", path: "/BookingsByType" },
        { name: "FLIGHT HISTORY & PASSENGER DATA", path: "/flightHistory" },
        { name: "TOTAL REVENUE", path: "/totalRevenue" },
    ];

    return (
        <div className="flex">
            <nav className="w-1/5 bg-gray-800 text-white p-4 h-screen">
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                    {topics.map((topic, index) => (
                        <li key={index} className="p-2 hover:bg-gray-700 rounded">
                            <Link href={topic.path}>
                                {topic.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex-1 p-4 bg-gray-100">{children}</div>
        </div>
    );
};

export default Navbar;