import { Worker } from "bullmq";
import { redisConnection } from "../../config/redis";
import { DexRouter } from "../router/dex.router";
import { retry } from "./../../utils/retry";

const router = new DexRouter();

new Worker(
  "orders",
  async (job) => {
    const { orderId } = job.data;

    const bestDex = await router.route();
    const result = await retry(() => router.execute(bestDex.dex));

    return result;
  },
  {
    connection: redisConnection,
    concurrency: 10
  }
);
