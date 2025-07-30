import { IMessageRepository } from "@chat/domain/entities/IMessageRepository";
import { Message } from "@chat/domain/entities/Message";
import { MessageStatus } from "@chat/domain/enum/MessageStatus";
import { MessageMapper, MessageStatusMapper } from "@chat/util/MessageMapper";
import { prisma } from "@infrastructure/config/Prisma";
import { injectable } from "inversify";

@injectable()
export class MessageRepository implements IMessageRepository {
  async create(msg: Message): Promise<Message> {
    const model = await prisma.message.create({
      data: {
        ...MessageMapper.fromDomainToPrisma(msg),
        id: undefined,
      },
    });

    return MessageMapper.fromPrismaToDomain(model);
  }
  update(msg: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }

  async updateManyStatus(msg: Message[]): Promise<void> {
    const updates = msg.map((msg) =>
      prisma.message.update({
        where: {
          id: msg.getId(),
        },
        data: {
          status: MessageStatusMapper.fromDomainToPrisma(msg.getStatus()),
          updateAt: new Date(),
        },
      })
    );

    const results = await Promise.allSettled(updates);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("Erro ao atualizar mensagem:", result.reason);
      }
    }
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

  async findByUserAndStatus(
    userId: string,
    status: MessageStatus
  ): Promise<Message[]> {
    const models = await prisma.message.findMany({
      where: {
        receiverId: userId,
        status: MessageStatusMapper.fromDomainToPrisma(status),
      },
    });

    return models.map(MessageMapper.fromPrismaToDomain);
  }

  async findConversationMessagesBefore(
    user1Id: string,
    user2Id: string,
    options: { limit: number; date: Date }
  ): Promise<Message[]> {
    const models = await prisma.message.findMany({
      where: {
        senderId: user1Id,
        receiverId: user2Id,

        createAt: {
          gte: options.date,
        },
      },
      take: options.limit,
      orderBy: {
        createAt: "asc",
      },
    });

    return models.map(MessageMapper.fromPrismaToDomain);
  }

  async findConversationMessagesAfter(
    user1Id: string,
    user2Id: string,
    options: { limit: number; date: Date }
  ): Promise<Message[]> {
    const models = await prisma.message.findMany({
      where: {
        senderId: user1Id,
        receiverId: user2Id,

        createAt: {
          lte: options.date,
        },
      },
      take: options.limit,
      orderBy: {
        createAt: "desc",
      },
    });

    return models.map(MessageMapper.fromPrismaToDomain);
  }
}
