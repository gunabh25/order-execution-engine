import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerSwagger } from "./plugins/swagger";
import { orderRoutes } from "./modules/orders/order.controller";
import { orderWebsocket } from "./modules/orders/order.ws";

const app = Fastify({ logger: true });

await app.register(websocket);
await registerSwagger(app);

await orderRoutes(app);
orderWebsocket(app);

app.listen({ port: 3000 }, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
