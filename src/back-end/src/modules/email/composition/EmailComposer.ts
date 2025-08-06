import { TYPES } from "@compositionRoot/Types";
import { EmailController } from "@email/inBound/EmailController";
import { EmailService } from "@email/service/EmailService";
import { IEmailService } from "@email/service/IEmailService";
import { Container } from "inversify";

export function emailComposerModuler(container: Container) {
  container
    .bind<IEmailService>(TYPES.IEmailService)
    .to(EmailService)
    .inSingletonScope();

  container
    .bind<EmailController>(TYPES.EmailController)
    .to(EmailController)
    .inRequestScope();
}
