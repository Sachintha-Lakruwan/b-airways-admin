// src/app/api/analytics/flights/past_flight_data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPastFlights } from "@/services/databaseService"; // Adjust the path as necessary

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!origin || !destination || origin.length !== 3 || destination.length !== 3) {
        return new Response("Invalid origin or destination", { status: 400 });
    }

    try {
        const pastFlights = await getPastFlights(origin, destination, limit, offset);
        return NextResponse.json(pastFlights);
    } catch (error) {
        console.error("Error fetching past flights:", error);
        return new NextResponse("Error executing query", { status: 500 });
    }
}
