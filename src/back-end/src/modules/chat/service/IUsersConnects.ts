import { WebSocket } from "ws";

export interface IUsersConnects {
  connection(userId: string, socket: WebSocket): Promise<WebSocket>;

  getConnection(userId: string): Promise<WebSocket | null>;
  deleteConnection(userId: string): Promise<true>;
}
