import { Container } from "inversify";
import { TYPES } from "@compositionRoot/Types";

import { IMessageService } from "@chat/service/IMessageService";
import { IMessageRepository } from "@chat/domain/entities/IMessageRepository";
import { IUsersConnects } from "@chat/service/IUsersConnects";

import { MessageService } from "@chat/service/MessageService";
import { UsersConnects } from "@chat/service/UsersConnects";
import { MessageRepository } from "@chat/repository/MessageRepository";

import { ChatController } from "@chat/inBound/ChatController";

export function chatComposerModule(container: Container) {
  container
    .bind<IMessageRepository>(TYPES.IMessageRepository)
    .to(MessageRepository)
    .inSingletonScope();
  container
    .bind<IMessageService>(TYPES.IMessageService)
    .to(MessageService)
    .inSingletonScope();
  container
    .bind<IUsersConnects>(TYPES.IUsersConnects)
    .to(UsersConnects)
    .inSingletonScope();
  container
    .bind<ChatController>(TYPES.ChatController)
    .to(ChatController)
    .inRequestScope();
}
