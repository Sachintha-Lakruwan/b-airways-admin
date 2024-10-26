// src/app/api/analytics/bookings/type_count/route.ts
import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("start_date");
    const endDate = searchParams.get("end_date");

    if (!startDate || !endDate) {
        return new Response("Invalid form data", { status: 400 });
    }

    const bookingCountQuery = `
        SELECT lt.name AS loyalty_type, COUNT(b.id) AS booking_count
        FROM booking b
        JOIN registered_user u ON b.registered_user_id = u.id
        JOIN loyalty_type lt ON u.loyalty_type_id = lt.id
        WHERE b.date BETWEEN ? AND ?
        GROUP BY lt.name;
    `;

    const bookingCount = await executeQuery(bookingCountQuery, [startDate, endDate]);

    return NextResponse.json(bookingCount);
}
