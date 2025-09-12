export type Employee = {
  employee_id: string;   // UUID
  user_id: string;       // FK -> users.id
  name: string;
  designation: string;
  dob: string;           // ISO date (e.g., "1980-05-12")
  license_number: string;
  experience: number;
  created_at: string;    // timestamp
};

export type Crew = {
  crew_id: string;       // UUID
  user_id: string;       // FK -> users.id
  crew_name: string;
  created_at: string;
};

export type CrewMember = {
  crew_id: string;       // FK -> crew.crew_id
  employee_id: string;   // FK -> employee.employee_id
  role: string;
};

export type Aircraft = {
  aircraft_id: string;   // UUID
  user_id: string;       // FK -> users.id
  model: string;
  manufacturer: string;
  capacity: number;
  maintenance_status: string;
  created_at: string;
};

export type Airport = {
  airport_id: string;    // UUID
  user_id: string;       // FK -> users.id
  code: string;
  name: string;
  city: string;
  country: string;
  created_at: string;
};

export type Flight = {
  flight_id: string;             // UUID
  user_id: string;               // FK -> users.id
  flight_no: string;
  status: string;
  aircraft_id: string;           // FK -> aircraft.aircraft_id
  origin_airport_id: string;     // FK -> airport.airport_id
  destination_airport_id: string;// FK -> airport.airport_id
  created_at: string;
};

export type FlightSchedule = {
  schedule_id: string;   // UUID
  user_id: string;       // FK -> users.id
  crew_id: string;       // FK -> crew.crew_id
  flight_id: string;     // FK -> flight.flight_id
  arrival_time: string;  // timestamp
  departure_time: string;// timestamp
  date: string;          // ISO date
  created_at: string;
};
