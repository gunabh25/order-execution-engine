import Redis from "ioredis";

export const eventBus = new Redis();

export function publishOrderEvent(orderId: string, payload: any) {
  eventBus.publish(
    "order-events",
    JSON.stringify({ orderId, payload })
  );
}
