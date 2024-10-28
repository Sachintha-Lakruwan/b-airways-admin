import { useState, useEffect } from "react";

interface Passenger {
    name: string;
    age: number;
    country: string;
    gender: string;
    passport_number: string;
    NIC: string;
}

interface PassengerGroups {
    under_18: Passenger[];
    above_18: Passenger[];
}

export default function FlightPassengers() {
    const [flightCode, setFlightCode] = useState("");
    const [data, setData] = useState<PassengerGroups | null>(null);
    const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(null);

    const fetchPassengerData = async () => {
        const res = await fetch(`/api/analytics/passengers/age_distribution?flight_code=${flightCode}`);
        const result = await res.json();
        setData(result);
        setSelectedPassenger(null); // Clear selected passenger on new search
    };

    const handlePassengerClick = (passenger: Passenger) => {
        setSelectedPassenger(passenger === selectedPassenger ? null : passenger); // Toggle selection
    };

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Passengers by Age Group</h2>
            <input
                type="text"
                placeholder="Enter Flight Code"
                value={flightCode}
                onChange={(e) => setFlightCode(e.target.value)}
                className="border p-2 mb-4 w-full"
            />
            <button onClick={fetchPassengerData} className="px-4 py-2 bg-blue-600 text-white rounded">
                Fetch Passengers
            </button>

            <div className="flex gap-4 mt-6">
                {/* Passengers Under 18 */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Under 18</h3>
                    <ul className="border rounded p-4 h-48 overflow-y-auto">
                        {data?.under_18.length ? (
                            data.under_18.map((passenger) => (
                                <li key={passenger.name} className="cursor-pointer" onClick={() => handlePassengerClick(passenger)}>
                                    {passenger.name}
                                    {selectedPassenger === passenger && (
                                        <div className="p-2 mt-2 bg-gray-100 border rounded">
                                            <p>Age: {passenger.age}</p>
                                            <p>Country: {passenger.country}</p>
                                            <p>Gender: {passenger.gender}</p>
                                            <p>Passport No: {passenger.passport_number}</p>
                                            <p>NIC: {passenger.NIC}</p>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No passengers found</p>
                        )}
                    </ul>
                </div>

                {/* Passengers Above 18 */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">18 and Above</h3>
                    <ul className="border rounded p-4 h-48 overflow-y-auto">
                        {data?.above_18.length ? (
                            data.above_18.map((passenger) => (
                                <li key={passenger.name} className="cursor-pointer" onClick={() => handlePassengerClick(passenger)}>
                                    {passenger.name}
                                    {selectedPassenger === passenger && (
                                        <div className="p-2 mt-2 bg-gray-100 border rounded">
                                            <p>Age: {passenger.age}</p>
                                            <p>Country: {passenger.country}</p>
                                            <p>Gender: {passenger.gender}</p>
                                            <p>Passport No: {passenger.passport_number}</p>
                                            <p>NIC: {passenger.NIC}</p>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No passengers found</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
