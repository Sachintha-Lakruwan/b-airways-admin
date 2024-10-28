// src/app/admin/home/page.tsx
"use client";

import { useState } from "react";
import FlightPassengers from "@/components/admin/FlightPassengers";
import DestinationPassengerCount from "@/components/admin/DestinationPassengerCount";
import BookingsByType from "@/components/admin/BookingsByType";
import PastFlightsData from "@/components/admin/PastFlightsData";
import RevenueByAircraft from "@/components/admin/RevenueByAircraft";

export default function AdminHomePage() {
    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FlightPassengers />
                <DestinationPassengerCount />
                <BookingsByType />
                <PastFlightsData />
                <RevenueByAircraft />
            </div>
        </div>
    );
}
