import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@database/database"; // Adjust the path as needed

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const departure_airport = searchParams.get("departure_airport");
    const arrival_airport = searchParams.get("arrival_airport");

    // Validate input
    if (!departure_airport || !arrival_airport) {
        return new NextResponse('Missing departure or arrival airport', { status: 400 });
    }

    try {
        const flightHistory = await executeQuery(`
            SELECT 
                schedule.flight_code,
                schedule.date,
                schedule.delay,
                COUNT(booking.passenger_id) AS passenger_count
            FROM schedule
            LEFT JOIN booking ON schedule.id = booking.schedule_id
            WHERE schedule.airplane_number IN (
                SELECT airplane_number
                FROM airplane
                WHERE departure_airport = ? AND arrival_airport = ?
            )
            GROUP BY schedule.flight_code, schedule.date, schedule.delay
            ORDER BY schedule.date DESC;
        `, [departure_airport, arrival_airport]);

        return NextResponse.json(flightHistory);
    } catch (err) {
        console.error("Error executing query:", err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
