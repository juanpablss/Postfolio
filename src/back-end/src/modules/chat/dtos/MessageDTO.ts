import { WebSocket } from "ws";

interface SendMessageDTO {
  type: string;
  toUserId: string;
  fromUserId: string;
  text: string;
  socket: WebSocket;
}
interface UpdateMessageDTO {}

export { SendMessageDTO, UpdateMessageDTO };
