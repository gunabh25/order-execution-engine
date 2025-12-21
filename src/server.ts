import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerSwagger } from "./plugins/swagger";
import { orderRoutes } from "./modules/orders/order.controller";
import { orderWebsocket } from "./modules/orders/order.ws";
import Redis from "ioredis";
import { wsGateway } from "./realtime/ws.gateway";


const subscriber = new Redis();

subscriber.subscribe("order-events");
subscriber.on("message", (_, message) => {
  const { orderId, payload } = JSON.parse(message);
  wsGateway.emit(orderId, payload);
});

const app = Fastify({ logger: true });

await app.register(websocket);
await registerSwagger(app);

await orderRoutes(app);
orderWebsocket(app);

app.listen({ port: 3000 }, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
