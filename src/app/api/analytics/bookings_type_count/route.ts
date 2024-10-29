// src/app/api/analytics/bookings/type_count/route.ts
//TESTED AND CONFIRMED
import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request: NextRequest) {
    console.log("hereee")
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    if (!startDate || !endDate) {
        return new Response("Invalid form data", { status: 400 });
    }

    const bookingCountQuery = `
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
    `;

    const bookingCount = await executeQuery(bookingCountQuery, [startDate, endDate]);

    return NextResponse.json(bookingCount);
}
