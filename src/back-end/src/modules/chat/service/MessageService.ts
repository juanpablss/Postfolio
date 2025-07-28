import { IMessageRepository } from "@chat/domain/entities/IMessageRepository";
import { Message } from "@chat/domain/entities/Message";
import { SendMessageDTO, UpdateMessageDTO } from "@chat/dtos/MessageDTO";
import { IMessageService } from "@chat/service/IMessageService";
import { TYPES } from "@compositionRoot/Types";
import { inject, injectable } from "inversify";
import { IUsersConnects } from "@chat/service/IUsersConnects";
import { MessageMapper } from "@chat/util/MessageMapper";
import { MessageStatus } from "@chat/domain/enum/MessageStatus";
import { BadRequest } from "@shared/error/HttpError";
import { WebSocket } from "ws";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.IMessageRepository)
    private messageRepository: IMessageRepository,
    @inject(TYPES.IUsersConnects)
    private usersConnects: IUsersConnects
  ) {}

  async sendMessage(sendMessageDto: SendMessageDTO): Promise<void> {
    const message = MessageMapper.fromSendMessageDTOtoDomain(sendMessageDto);

    const socket = await this.usersConnects.getConnection(
      sendMessageDto.toUserId
    );

    if (!socket) {
      await this.messageRepository.create(message);
      sendMessageDto.socket.send("O usuario está offline");
      return;
    }

    message.setStatus(MessageStatus.RECEIVED);
    // const id = (await this.messageRepository.create(message)).getId();
    socket.send(
      JSON.stringify({
        msgId: "ID_FALSO",
        from: message.senderId,
        text: message.getContent(),
        timestamp: message.createAt,
      })
    );
  }

  updateMessage(updateMessageDto: UpdateMessageDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async processOfflineMessages(userId: string): Promise<void> {
    const socket = await this.usersConnects.getConnection(userId);

    if (!socket) {
      throw new BadRequest("O socket do usuario não registrado!");
    }

    const messages = await this.messageRepository.findByUserAndStatus(
      userId,
      MessageStatus.UNRECEIVED
    );

    messages.forEach((msg) => {
      if (socket.readyState == WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            msgId: msg.getId(),
            type: "offline",
            from: msg.senderId,
            text: msg.getContent(),
            timestamp: msg.createAt,
          })
        );

        msg.setStatus(MessageStatus.RECEIVED);
      }
    });

    await this.messageRepository.updateManyStatus(messages);
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
