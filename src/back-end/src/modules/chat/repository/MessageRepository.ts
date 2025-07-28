import { IMessageRepository } from "@chat/domain/entities/IMessageRepository";
import { Message } from "@chat/domain/entities/Message";
import { MessageStatus } from "@chat/domain/enum/MessageStatus";
import { injectable } from "inversify";

@injectable()
export class MessageRepository implements IMessageRepository {
  create(msg: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  update(msg: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  updateManyStatus(msg: Message[]): Promise<void> {
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
  findByUserAndStatus(
    userId: string,
    status: MessageStatus
  ): Promise<Message[]> {
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
