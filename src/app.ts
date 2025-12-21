import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { registerSwagger } from "./plugins/swagger";
import { orderRoutes } from "./modules/orders/order.controller";
import { orderWebsocket } from "./modules/orders/order.ws";

export async function buildApp() {
  const app = Fastify({
    logger: true
  });

  // Plugins
  await app.register(websocket);
  await registerSwagger(app);

  // Routes
  await orderRoutes(app);
  orderWebsocket(app);

  return app;
}
