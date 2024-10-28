// src/app/api/analytics/passengers/age_distribution/route.ts
//TESTED AND CONFIRMED
import { NextRequest, NextResponse } from "next/server";
import { getPassengerCountByAge } from "@services/databaseService";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const flightCode = searchParams.get("flight_code");

    if (typeof flightCode !== "string") {
        return NextResponse.json({ error: "Invalid flight code" }, { status: 400 });
    }

    try {
        const passengers = await getPassengerCountByAge(flightCode);
        
        // Always return empty arrays if no passengers are found for a group
        const groupedPassengers = {
            under_18: passengers?.filter((p: any) => p.age_group === "under_18") || [],
            above_18: passengers?.filter((p: any) => p.age_group === "above_18") || [],
        };

        return NextResponse.json(groupedPassengers);
    } catch (error) {
        console.error("Error fetching passengers:", error);
        return NextResponse.json({ error: "Error executing query" }, { status: 500 });
    }
}
