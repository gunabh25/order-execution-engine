import Fastify from "fastify";
import websocket from "fastify-websocket";
import { orderRoutes } from "./modules/orders/order.controller.js";
import { orderWebsocket } from "./modules/orders/order.ws.js";

const app = Fastify();
app.register(websocket);

await orderRoutes(app);
orderWebsocket(app);

app.listen({ port: 3000 }, () => {
  console.log("🚀 API running on http://localhost:3000");
});
