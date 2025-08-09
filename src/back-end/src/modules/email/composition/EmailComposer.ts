import { TYPES } from "@compositionRoot/Types";
import { EmailUserCreatedHandler } from "@email/handler/EmailUserCreatedHandler";
import { EmailController } from "@email/api/EmailController";
import { EmailService } from "@email/application/EmailService";
import { IEmailService } from "@email/domain/interfaces/IEmailService";
import { Container } from "inversify";
import { EmailUserUpdateHandler } from "@email/handler/EmailUserUpdateHandler";

export function emailComposerModuler(container: Container) {
  container
    .bind<IEmailService>(TYPES.IEmailService)
    .to(EmailService)
    .inRequestScope();

  container
    .bind<EmailController>(TYPES.EmailController)
    .to(EmailController)
    .inRequestScope();

  container
    .bind<EmailUserCreatedHandler>(EmailUserCreatedHandler)
    .toSelf()
    .inRequestScope();
  container
    .bind<EmailUserUpdateHandler>(EmailUserUpdateHandler)
    .toSelf()
    .inRequestScope();
}
