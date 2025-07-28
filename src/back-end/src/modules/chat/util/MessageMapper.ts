import { Message } from "@chat/domain/entities/Message";
import { SendMessageDTO } from "@chat/dtos/MessageDTO";

export const MessageMapper = {
  fromSendMessageDTOtoDomain(dto: SendMessageDTO): Message {
    return new Message("", dto.text, dto.fromUserId, dto.toUserId);
  },
};
