// src/app/api/analytics/flights/past_flight_data/route.ts
import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!origin || !destination) {
        return new Response("Invalid form data", { status: 400 });
    }

    const pastFlightsQuery = `
        SELECT 
            s.flight_code, s.date, s.status,
            COUNT(b.id) AS passenger_count
        FROM schedule s
        JOIN route r ON s.flight_code = r.flight_code
        JOIN booking b ON s.id = b.schedule_id
        WHERE r.departure = ? AND r.arrival = ? AND s.date < CURRENT_DATE
        GROUP BY s.flight_code, s.date, s.status
        ORDER BY s.date DESC
        LIMIT ? OFFSET ?;
    `;

    const pastFlights = await executeQuery(pastFlightsQuery, [origin, destination, limit, offset]);

    return NextResponse.json(pastFlights);
}
