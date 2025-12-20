import { Queue } from "bullmq";
import Redis from "ioredis";

export const orderQueue = new Queue("orders", {
  connection: new Redis()
});
