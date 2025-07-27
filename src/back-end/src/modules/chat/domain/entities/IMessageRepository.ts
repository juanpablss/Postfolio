import { Message } from "@chat/domain/entities/Message";

export interface IMessageRepository {
  create(msg: Message): Promise<Message>;
  update(msg: Message): Promise<Message>;
  delete(id: string): Promise<Message | null>;

  findById(id: string): Promise<Message | null>;
  findByUser(userId: string): Promise<Message[]>;
  findUnreadByRecipient(recipientId: string): Promise<Message[]>;
  findConversationMessages(
    user1Id: string,
    user2Id: string,
    options?: { limit?: number; before?: string }
  ): Promise<Message[]>;
}
