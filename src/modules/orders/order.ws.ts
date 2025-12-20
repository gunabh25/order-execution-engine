import { FastifyInstance } from "fastify";
import { SocketStream } from "@fastify/websocket";

export function orderWebsocket(app: FastifyInstance) {
  app.get(
    "/api/orders/execute",
    { websocket: true },
    (connection: SocketStream) => {
      const { socket } = connection;

      socket.send(JSON.stringify({ status: "pending" }));

      socket.on("message", (msg: Buffer) => {
        console.log("WS message:", msg.toString());
      });
    }
  );
}
