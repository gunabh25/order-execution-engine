import { FastifyInstance } from "fastify";
import { SocketStream } from "@fastify/websocket";
import { wsGateway } from "../../realtime/ws.gateway";

export function orderWebsocket(app: FastifyInstance) {
  app.get(
    "/api/orders/execute",
    { websocket: true },
    (connection: SocketStream, req) => {
      const { socket } = connection;
      const { orderId } = req.query as { orderId: string };

      wsGateway.register(orderId, socket);

      socket.send(JSON.stringify({ status: "pending" }));

      socket.on("close", () => {
        wsGateway.remove(orderId);
      });
    }
  );
}
