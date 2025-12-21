import { Worker } from "bullmq";
import { DexRouter } from "../router/dex.router";
import { retry } from "../../utils/retry";
import { publishOrderEvent } from "../../realtime/events.publisher";
import { saveOrder } from "../../db/order.repository";
import { redisConnection } from "../../config/redis";

const router = new DexRouter();

new Worker(
  "orders",
  async (job) => {
    const { orderId, payload } = job.data;

    publishOrderEvent(orderId, { status: "routing" });
    await saveOrder(orderId, "routing", payload);

    try {
      publishOrderEvent(orderId, { status: "building" });

      const best = await router.route();

      publishOrderEvent(orderId, {
        status: "submitted",
        dex: best.dex
      });

      const result = await retry(() =>
        router.execute(best.dex)
      );

      publishOrderEvent(orderId, {
        status: "confirmed",
        txHash: result.txHash,
        price: result.executedPrice
      });

      await saveOrder(orderId, "confirmed", result);

      return result;
    } catch (err: any) {
      publishOrderEvent(orderId, {
        status: "failed",
        error: err.message
      });

      await saveOrder(orderId, "failed", { error: err.message });
      throw err;
    }
  },
  { 
    connection: redisConnection,
    concurrency: 10 
}
);
