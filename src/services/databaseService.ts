// src/services/databaseService.ts
import { executeQuery } from "@database/database";

/**
 * Get total revenue by a specific aircraft type.
 * @param airplaneModel The aircraft model ID.
 */
export async function getRevenueByAircraftType(airplaneModel: string) {
    const query = `
        SELECT airplane_model.name AS aircraft_type,
            SUM(booking.price) AS total_revenue
        FROM booking
        JOIN schedule ON booking.schedule_id = schedule.id
        JOIN airplane ON schedule.airplane_number = airplane.tail_number
        JOIN airplane_model ON airplane.model_id = airplane_model.id
        GROUP BY airplane_model.id, airplane_model.name;
    `;
    return await executeQuery(query, [airplaneModel]);
}

/**
 * Fetch past flights with state and passenger count based on origin and destination.
 * @param origin Origin airport code (alpha-3)
 * @param destination Destination airport code (alpha-3)
 * @param limit Number of records to return
 * @param offset Number of records to skip for pagination
 */
export async function getPastFlights(origin: string, destination: string, limit: number, offset: number) {
    const query = `
        SELECT 
            s.flight_code AS flight_code,
            s.date AS flight_date,
            CASE 
                WHEN MAX(s.delay) > '00:00:00' THEN CONCAT('Delayed ', MAX(s.delay))
                ELSE 'On-time'
            END AS state,
            COUNT(b.id) AS passenger_count
        FROM schedule s
        JOIN route r ON s.flight_code = r.flight_code
        LEFT JOIN booking b ON s.id = b.schedule_id
        WHERE r.departure = ? 
        AND r.arrival = ? 
        AND s.date < CURRENT_DATE
        GROUP BY s.flight_code, s.date
        ORDER BY s.date DESC
        LIMIT ? OFFSET ?;
    `;
    return await executeQuery(query, [origin, destination, limit, offset]);
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