"use client"
// Navbar.tsx
import React, { useState } from "react";

const Navbar = ({ children }) => {
    // Define the topics as a state variable
    const [topics, setTopics] = useState<string[]>([
        "Flight Search",
        "Bookings",
        "Flight Status",
        "Customer Support",
        "Settings",
    ]);

    return (
        <div className="flex">
            <nav className="w-1/5 bg-gray-800 text-white p-4 h-screen">
                <h2 className="text-xl font-bold mb-4">Navigation</h2>
                <ul className="space-y-2">
                    {topics.map((topic, index) => (
                        <li key={index} className="p-2 hover:bg-gray-700 rounded">
                            {topic}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex-1 p-4 bg-gray-100">{children}</div>
        </div>
    );
};

export default Navbar;