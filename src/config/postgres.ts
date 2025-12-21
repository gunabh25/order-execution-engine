import { Pool } from "pg";
import { env } from "./env";

/**
 * PostgreSQL connection pool
 * Used across services & workers
 */
export const pg = new Pool({
  host: env.POSTGRES.host,
  port: env.POSTGRES.port,
  user: env.POSTGRES.user,
  password: env.POSTGRES.password,
  database: env.POSTGRES.database,
  max: 10,                 // pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

pg.on("connect", () => {
  console.log("🟢 PostgreSQL connected");
});

pg.on("error", (err) => {
  console.error("🔴 PostgreSQL connection error:", err);
  process.exit(1);
});
