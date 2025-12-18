import { FastifyInstance } from "fastify";
import { orderQueue } from "../queue/order.queue.js";
import { v4 as uuid } from "uuid";

export async function orderRoutes(app: FastifyInstance) {
  app.post("/api/orders/execute", async (req) => {
    const orderId = uuid();

    await orderQueue.add("execute", {
      orderId,
      payload: req.body
    });

    return { orderId };
  });
}
