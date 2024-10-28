// src/app/api/analytics/passengers/destination_count/route.ts
//TESTED AND CONFIRMED
import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@database/database";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    if (!destination || !startDate || !endDate) {
        return new Response("Invalid form data", { status: 400 });
    }

    const passengerCountQuery = `
        SELECT COUNT(*) AS passenger_count
        FROM booking b
        JOIN schedule s ON b.schedule_id = s.id
        JOIN route r ON s.flight_code = r.flight_code
        JOIN airport a ON r.arrival = a.code
        WHERE a.code = ? AND s.date BETWEEN ? AND ?;
    `;

    const passengerCount = await executeQuery(passengerCountQuery, [destination, startDate, endDate]);

    return NextResponse.json(passengerCount);
}
