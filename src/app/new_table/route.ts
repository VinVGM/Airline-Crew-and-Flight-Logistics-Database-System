import bcrypt from "bcrypt";
import { create } from "domain";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
    `;

  const hashedPassword = await bcrypt.hash("lmao", 10);
  await sql`INSERT INTO users (name, email, password) VALUES ('John Doe', 'lmao@gmail.com', ${hashedPassword})`;

}

async function createEmployeeTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS EMPLOYEE (
    Employee_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Name VARCHAR(100) NOT NULL,
    Designation VARCHAR(50) NOT NULL,
    DOB DATE NOT NULL,
    License_Number VARCHAR(50) UNIQUE,
    Experience INT CHECK (Experience >= 0),
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );
    `;
}

async function createCrewTable() {
    await sql`
    CREATE TABLE IF NOT EXISTS CREW (
    Crew_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Crew_Name VARCHAR(100) NOT NULL,
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );
    `
}

async function createCrewMembersTable() {
    await sql`
    CREATE TABLE IF NOT EXISTS CREW_MEMBER (
    Crew_ID UUID NOT NULL REFERENCES CREW(Crew_ID) ON DELETE CASCADE,
    Employee_ID UUID NOT NULL REFERENCES EMPLOYEE(Employee_ID) ON DELETE CASCADE,
    Role VARCHAR(50) NOT NULL,
    PRIMARY KEY (Crew_ID, Employee_ID)
    );
    `
}

async function createAircraftTable() {
    await sql`CREATE TABLE IF NOT EXISTS AIRCRAFT (
    Aircraft_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Model VARCHAR(100) NOT NULL,
    Manufacturer VARCHAR(100) NOT NULL,
    Capacity INT CHECK (Capacity > 0),
    Maintenance_Status VARCHAR(50) NOT NULL,
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );
    `
}

async function createAirportTable() {
    await sql`
    CREATE TABLE IF NOT EXISTS AIRPORT (
    Airport_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Code VARCHAR(10) UNIQUE NOT NULL,
    Name VARCHAR(100) NOT NULL,
    City VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL,
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );

    `
}


async function createFlightTable() {
    await sql`
    CREATE TABLE IF NOT EXISTS FLIGHT (
    Flight_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Flight_No VARCHAR(20) UNIQUE NOT NULL,
    Status VARCHAR(50) NOT NULL,
    Aircraft_ID UUID NOT NULL REFERENCES AIRCRAFT(Aircraft_ID) ON DELETE CASCADE,
    Origin_Airport_ID UUID NOT NULL REFERENCES AIRPORT(Airport_ID),
    Destination_Airport_ID UUID NOT NULL REFERENCES AIRPORT(Airport_ID),
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );
    `
}



async function createFlightSchedule() {
    await sql`
    CREATE TABLE IF NOT EXISTS FLIGHT_SCHEDULE (
    Schedule_ID UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    User_ID UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    Crew_ID UUID NOT NULL REFERENCES CREW(Crew_ID),
    Flight_ID UUID NOT NULL REFERENCES FLIGHT(Flight_ID),
    Arrival_Time TIMESTAMPTZ NOT NULL,
    Departure_Time TIMESTAMPTZ NOT NULL,
    Date DATE NOT NULL,
    Created_At TIMESTAMPTZ DEFAULT NOW()
    );

    `
}




export async function GET() {
  try {
    const result = await sql.begin((sql) => {
        //seedUsers();
        // createEmployeeTable();
        // createCrewTable();
        // createCrewMembersTable();
        // createAircraftTable();
        // createAirportTable();
        // createFlightTable();
        // createFlightSchedule();


    })

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create user table" },
      { status: 500 }
    );
  }
}
