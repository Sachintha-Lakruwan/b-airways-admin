// src/app/api/analytics/flights/past_flight_data/route.ts
//NEEDS FIXING
import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@database/database"; // Adjust the path as necessary

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

    const pastFlightsQuery = `
        SELECT 
            CONCAT(s.flight_code, ' - ', s.date) AS flight,
            CASE 
                WHEN MAX(s.delay) > '00:00:00' THEN CONCAT('Delayed ', MAX(s.delay))
                ELSE 'On-time'
            END AS state,
            COUNT(b.id) AS passenger_count
        FROM schedule s
        JOIN route r ON s.flight_code = r.flight_code
        LEFT JOIN booking b ON s.id = b.schedule_id
        WHERE r.departure = ? 
        AND r.arrival = ? 
        AND s.date < CURRENT_DATE
        GROUP BY s.flight_code, s.date
        ORDER BY s.date DESC
        LIMIT ? OFFSET ?;
    `;

    try {
        const pastFlights = await executeQuery(pastFlightsQuery, [origin, destination, limit, offset]);
        return NextResponse.json(pastFlights);
    } catch (error) {
        console.error("Error fetching past flights:", error);
        return new NextResponse("Error executing query", { status: 500 });
    }
}
