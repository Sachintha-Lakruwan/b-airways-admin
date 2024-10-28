import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@database/database"; // Adjust the path as needed

export async function GET(request: NextRequest, { params }) {
    const { name } = params;

    // Validate that the name is a string and not empty
    if (typeof name !== 'string' || name.trim() === '') {
        return new NextResponse('Invalid passenger name', { status: 400 });
    }

    try {
        const passengerDetails = await executeQuery(`
            SELECT 
                id,
                age,
                gender,
                passport_number,
                NIC,
                country_code
            FROM passenger
            WHERE name = ?;
        `, [name]);

        if (passengerDetails.length === 0) {
            return new NextResponse('Passenger not found', { status: 404 });
        }

        return NextResponse.json(passengerDetails[0]);
    } catch (err) {
        console.error("Error executing query:", err);
        return new NextResponse('Error executing query', { status: 500 });
    }
}
