import { FastifyInstance } from "fastify";
import { v4 as uuid } from "uuid";
import { orderQueue } from "../queue/order.queue";
import { orderSchema } from "./order.schema";
import { pg } from "../database/db"; // or your actual database import path

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

  app.get("/api/orders/:id", async (req) => {
  const { id } = req.params as { id: string };
  const result = await pg.query(
    "SELECT * FROM orders WHERE id=$1",
    [id]
  );
  return result.rows[0];
});
}
