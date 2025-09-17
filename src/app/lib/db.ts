import postgres from 'postgres';

// Shared Postgres client (singleton per server process)
// Avoids re-creating connections on each action/request
export const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' as const });


