import { Worker } from "bullmq";
import { DexRouter } from "../router/dex.router";
import { retry } from "./../../utils/retry";
import { redisConnection } from "../../config/redis";
import {
  createOrder,
  updateOrderStatus
} from "../orders/order.service";

const router = new DexRouter();

new Worker(
  "orders",
  async (job) => {
    const { orderId, payload } = job.data;

    await createOrder(orderId, payload);
    await updateOrderStatus(orderId, "routing");

    try {
      const best = await router.route();

      await updateOrderStatus(orderId, "submitted", {
        dex: best.dex
      });

      const result = await retry(() =>
        router.execute(best.dex)
      );

      await updateOrderStatus(orderId, "confirmed", {
        txHash: result.txHash,
        price: result.executedPrice
      });

      return result;
    } catch (err: any) {
      await updateOrderStatus(orderId, "failed", {
        error: err.message
      });
      throw err;
    }
  },
  {
    connection: redisConnection,
    concurrency: 10
  }
);
