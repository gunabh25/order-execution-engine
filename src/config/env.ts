export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: Number(process.env.PORT) || 3000,

  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",

  POSTGRES: {
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || "orderuser",
    password: process.env.PG_PASSWORD || "orderpass",
    database: process.env.PG_DATABASE || "orders"
  }
};
