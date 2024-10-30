// src/app/api/analytics/revenue/route.ts
//TESTED AND CONFIRMED
import { NextRequest, NextResponse } from "next/server";
import { getRevenueByAircraftType } from "@services/databaseService";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const airplaneModel = searchParams.get("airplane_model");

    if (typeof airplaneModel !== "string") {
        return new Response("Invalid form data", { status: 400 });
    }

    // Fetch revenue data directly without caching
    const revenue = await getRevenueByAircraftType(airplaneModel);

    return NextResponse.json(revenue);
}
