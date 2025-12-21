import { pg } from "../../config/postgres";
import { OrderStatus } from "./order.types";

export interface PersistOrderPayload {
  tokenIn?: string;
  tokenOut?: string;
  amount?: number;
  dex?: string;
  txHash?: string;
  price?: number;
  error?: string;
}

/**
 * Create a new order entry
 */
export async function createOrder(
  orderId: string,
  payload: PersistOrderPayload
) {
  await pg.query(
    `
    INSERT INTO orders (id, status, data)
    VALUES ($1, $2, $3)
    `,
    [orderId, "pending", payload]
  );
}

/**
 * Update order lifecycle status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  payload: PersistOrderPayload = {}
) {
  await pg.query(
    `
    UPDATE orders
    SET status = $2,
        data = data || $3::jsonb
    WHERE id = $1
    `,
    [orderId, status, payload]
  );
}

/**
 * Fetch order by ID
 */
export async function getOrderById(orderId: string) {
  const result = await pg.query(
    `SELECT * FROM orders WHERE id = $1`,
    [orderId]
  );

  return result.rows[0] || null;
}
