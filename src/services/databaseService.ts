// src/services/databaseService.ts
import { executeQuery } from "@database/database";

/**
 * Get total revenue by a specific aircraft type.
 * @param airplaneModel The aircraft model ID.
 */
export async function getRevenueByAircraftType(airplaneModel: string) {
    const query = `
        SELECT SUM(price) AS total_revenue
        FROM booking
        LEFT JOIN schedule ON booking.schedule_id = schedule.id
        LEFT JOIN airplane ON airplane.tail_number = schedule.airplane_number
        LEFT JOIN airplane_model ON airplane.model_id = airplane_model.id
        WHERE airplane_model.id = ?;
    `;
    return await executeQuery(query, [airplaneModel]);
}

/**
 * Get passenger count by age group for a given flight.
 * @param flightCode The flight code.
 */
export async function getPassengerCountByAge(flightCode: string) {
    const query = `
        SELECT 
            CASE WHEN p.age < 18 THEN 'under_18' ELSE 'above_18' END AS age_group,
            COUNT(*) AS passenger_count
        FROM booking b
        JOIN passenger p ON b.passenger_id = p.id
        JOIN schedule s ON b.schedule_id = s.id
        WHERE s.id = (
            SELECT id 
            FROM schedule 
            WHERE flight_code = ? 
            ORDER BY date DESC, id DESC 
            LIMIT 1
        )
        GROUP BY age_group;
    `;
    return await executeQuery(query, [flightCode]);
}
