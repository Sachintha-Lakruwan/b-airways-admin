import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database"; // Adjust the path as needed

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    // Validate input
    if (!destination || !startDate || !endDate) {
        return new NextResponse('Missing destination or date range', { status: 400 });
    }

    try {
        const passengerCount = await executeQuery(`
            SELECT 
                COUNT(booking.passenger_id) AS passenger_count
            FROM booking
            LEFT JOIN schedule ON booking.schedule_id = schedule.id
            LEFT JOIN airplane ON schedule.airplane_number = airplane.tail_number
            WHERE airplane.destination = ?
            AND schedule.date BETWEEN ? AND ?;
        `, [destination, startDate, endDate]);

        return NextResponse.json(passengerCount[0] || { passenger_count: 0 });
    } catch (err) {
        console.error("Error executing query:", err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
