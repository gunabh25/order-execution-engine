import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export async function registerSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Order Execution Engine",
        description: "DEX routing & order execution API",
        version: "1.0.0"
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs"
  });
}
