import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerSwagger } from "./plugins/swagger";
import { orderRoutes } from "./modules/orders/order.controller";
import { orderWebsocket } from "./modules/orders/order.ws";
import { wsGateway } from "./realtime/ws.gateway";
import { redisConnection } from "./config/redis";

// ✅ Reuse the SAME Redis connection (BullMQ-safe)
const subscriber = redisConnection.duplicate();

await subscriber.subscribe("order-events");

subscriber.on("message", (_, message) => {
  const { orderId, payload } = JSON.parse(message);
  wsGateway.emit(orderId, payload);
});

const app = Fastify({ logger: true });

await app.register(websocket);
await registerSwagger(app);

await orderRoutes(app);
orderWebsocket(app);

// ✅ Explicit host binding (CRITICAL)
await app.listen({
  port: 3000,
  host: "0.0.0.0"
});

console.log("🚀 Server running at http://localhost:3000");
