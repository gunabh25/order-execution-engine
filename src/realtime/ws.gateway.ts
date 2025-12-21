import { SocketStream } from "@fastify/websocket";

class WebSocketGateway {
  private connections = new Map<string, SocketStream["socket"]>();

  register(orderId: string, socket: SocketStream["socket"]) {
    this.connections.set(orderId, socket);
  }

  emit(orderId: string, payload: any) {
    const socket = this.connections.get(orderId);
    if (socket) {
      socket.send(JSON.stringify(payload));
    }
  }

  remove(orderId: string) {
    this.connections.delete(orderId);
  }
}

export const wsGateway = new WebSocketGateway();
