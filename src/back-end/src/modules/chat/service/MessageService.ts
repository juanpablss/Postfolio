import { IMessageRepository } from "@chat/domain/entities/IMessageRepository";
import { Message } from "@chat/domain/entities/Message";

class MessageService implements IMessageRepository {
  create(msg: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }

  update(msg: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  findByUser(userId: string): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  findUnreadByRecipient(recipientId: string): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
  findConversationMessages(
    user1Id: string,
    user2Id: string,
    options?: { limit?: number; before?: string }
  ): Promise<Message[]> {
    throw new Error("Method not implemented.");
  }
}
