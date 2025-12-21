import Redis from "ioredis";

export const redisConnection = new Redis({
  maxRetriesPerRequest: null, // REQUIRED by BullMQ
  enableReadyCheck: false
});

redisConnection.on("connect", () => {
  console.log("🟢 Redis connected");
});

redisConnection.on("error", (err) => {
  console.error("🔴 Redis error:", err.message);
});
