import Redis from "ioredis";

export const redisConnection = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  retryStrategy: (times) => {
    if (times > 5) return null; // stop retrying
    return 500;
  }
});

redisConnection.on("error", (err) => {
  console.error("🔴 Redis error:", err.message);
});
