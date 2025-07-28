import { Container } from "inversify";
import { TYPES } from "@compositionRoot/Types";

import { IMessageService } from "@chat/service/IMessageService";
import { UsersConnects } from "@chat/service/UsersConnects";

import { MessageService } from "@chat/service/MessageService";
import { IUsersConnects } from "@chat/service/IUsersConnects";
import { ChatController } from "@chat/inBound/ChatController";

export function chatComposerModule(container: Container) {
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
