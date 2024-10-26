// src/app/api/analytics/passengers/age_distribution/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPassengerCountByAge } from "@services/databaseService";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const flightCode = searchParams.get("flight_code");

    if (typeof flightCode !== "string") {
        return new Response("Invalid form data", { status: 400 });
    }

    const ageData = await getPassengerCountByAge(flightCode);
    return NextResponse.json(ageData);
}
