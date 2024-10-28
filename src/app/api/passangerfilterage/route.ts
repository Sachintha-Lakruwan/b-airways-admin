import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@database/database";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const flight_code = searchParams.get("flight_code");

    // Validate input
    if (typeof flight_code !== 'string' || !flight_code.trim()) {
        return new NextResponse('Invalid or missing flight code', { status: 400 });
    }

    try {
        // Query to retrieve passenger count and names by age groups for a given flight code
        const flightPassengerDetails = await executeQuery(`
            SELECT 
                SUM(CASE WHEN passenger.age < 18 THEN 1 ELSE 0 END) AS under_18_count,
                GROUP_CONCAT(CASE WHEN passenger.age < 18 THEN passenger.name END) AS under_18_names,
                SUM(CASE WHEN passenger.age >= 18 THEN 1 ELSE 0 END) AS above_18_count,
                GROUP_CONCAT(CASE WHEN passenger.age >= 18 THEN passenger.name END) AS above_18_names
            FROM booking
            LEFT JOIN passenger ON booking.passenger_id = passenger.id
            LEFT JOIN schedule ON booking.schedule_id = schedule.id
            WHERE schedule.id = (
                SELECT id
                FROM schedule
                WHERE flight_code = ?
                ORDER BY id DESC
                LIMIT 1
            );
        `);

        // Return the result as a JSON response
        return NextResponse.json(flightPassengerDetails[0] || {
            under_18_count: 0,
            under_18_names: null,
            above_18_count: 0,
            above_18_names: null
        });
    } catch (err) {
        console.error("Error executing query:", err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
