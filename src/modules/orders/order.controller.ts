import { FastifyInstance } from "fastify";
import { v4 as uuid } from "uuid";
import { orderQueue } from "../queue/order.queue";
import { orderSchema } from "./order.schema";

export async function orderRoutes(app: FastifyInstance) {
  app.post(
    "/api/orders/execute",
    { schema: orderSchema },
    async (req) => {
      const orderId = uuid();

      await orderQueue.add("execute", {
        orderId,
        payload: req.body
      });

      return { orderId };
    }
  );
}
