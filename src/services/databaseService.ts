// src/services/databaseService.ts
import { executeQuery } from "@database/database";

/**
 * Get total revenue by a specific aircraft type.
 * @param airplaneModel The aircraft model ID.
 */
export async function getRevenueByAircraftType(airplaneModel: string) {
    const query = `
        SELECT SUM(booking.price) AS total_revenue
        FROM booking
        JOIN schedule ON booking.schedule_id = schedule.id
        JOIN airplane ON schedule.airplane_number = airplane.tail_number
        JOIN airplane_model ON airplane.model_id = airplane_model.id
        WHERE airplane_model.name = ?;
    `;
    const res = await executeQuery(query, [airplaneModel]);
    console.log(res[0]);
    return res[0]
}

/**
 * Get passenger count by age group for a given flight.
 * @param flightCode The flight code.
 */
export async function getPassengerCountByAge(flightCode: string) {
    const query = `
        SELECT 
            p.name, p.age, p.country_code AS country, p.gender, 
            p.passport_number, p.NIC,
            CASE WHEN p.age < 18 THEN 'under_18' ELSE 'above_18' END AS age_group
        FROM booking b
        JOIN passenger p ON b.passenger_id = p.id
        JOIN schedule s ON b.schedule_id = s.id
        WHERE s.id = (
            SELECT id 
            FROM schedule 
            WHERE flight_code = ? 
              AND date >= CURRENT_DATE
            ORDER BY date ASC, id ASC
            LIMIT 1
        );
    `;
    return await executeQuery(query, [flightCode]);  // Only one parameter is needed here
}