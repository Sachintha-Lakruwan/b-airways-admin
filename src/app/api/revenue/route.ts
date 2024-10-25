import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../database/database";

export async function GET(request: NextRequest) {
    try {
        const revenue = await executeQuery(`
            SELECT 
                airplane_model.name AS model_name, 
                SUM(booking.price) AS total_revenue
            FROM booking
            LEFT JOIN schedule ON booking.schedule_id = schedule.id
            LEFT JOIN airplane ON airplane.tail_number = schedule.airplane_number
            LEFT JOIN airplane_model ON airplane.model_id = airplane_model.id
            GROUP BY airplane_model.id;
        `);
        return NextResponse.json(revenue);
    } catch (err) {
        console.error(err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
