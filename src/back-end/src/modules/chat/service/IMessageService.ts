import { Message } from "@chat/domain/entities/Message";
import { SendMessageDTO, UpdateMessageDTO } from "@chat/dtos/MessageDTO";

export interface IMessageService {
  sendMessage(sendMessageDto: SendMessageDTO): Promise<void>;
  updateMessage(updateMessageDto: UpdateMessageDTO): Promise<void>;

  getOfflineMessages(userId: string): Promise<Message[]>;
  getConversationHistory(
    user1Id: string,
    user2Id: string,
    options?: { limit?: number; before?: string }
  ): Promise<Message[]>;
  markMessageAsRead(messageId: string, userId: string): Promise<void>;
}
