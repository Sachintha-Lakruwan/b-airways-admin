import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database"; // Adjust the path as needed

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    // Validate input
    if (!startDate || !endDate) {
        return new NextResponse('Missing date range', { status: 400 });
    }

    try {
        const bookingCounts = await executeQuery(`
            SELECT 
                CASE 
                    WHEN registered_user_id IS NULL THEN 'Guest'
                    WHEN registered_user.loyalty_type_id = 1 THEN 'New User'
                    WHEN registered_user.loyalty_type_id = 2 THEN 'Frequent User'
                    WHEN registered_user.loyalty_type_id = 3 THEN 'Gold User'
                    ELSE 'Other'
                END AS user_category,
                COUNT(*) AS booking_count
            FROM booking
            LEFT JOIN registered_user ON booking.registered_user_id = registered_user.id
            WHERE booking.date BETWEEN ? AND ?
            GROUP BY user_category;
        `, [startDate, endDate]);

        return NextResponse.json(bookingCounts);
    } catch (err) {
        console.error("Error executing query:", err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
