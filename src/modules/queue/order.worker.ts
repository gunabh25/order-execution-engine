import { Worker } from "bullmq";
import { DexRouter } from "../router/dex.router";
import { retry } from "../../utils/retry";

const router = new DexRouter();

new Worker(
  "orders",
  async (job) => {
    console.log("Order:", job.data.orderId, "→ routing");

    const bestDex = await router.route();
    const result = await retry(() => router.execute(bestDex.dex));

    console.log("Confirmed:", result.txHash);
    return result;
  },
  { concurrency: 10 }
);
