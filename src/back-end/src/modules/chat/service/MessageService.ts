import { Message } from "@chat/domain/entities/Message";
import { SendMessageDTO, UpdateMessageDTO } from "@chat/dtos/MessageDTO";
import { IMessageService } from "@chat/service/IMessageService";

class MessageService implements IMessageService {
  sendMessage(sendMessageDto: SendMessageDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateMessage(updateMessageDto: UpdateMessageDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  processOfflineMessages(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getConversationHistory(
    user1Id: string,
    user2Id: string,
    options?: { limit?: number; before?: string }
  ): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }

  markMessageAsRead(messageId: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
