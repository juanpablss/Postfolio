import { TYPES } from "@compositionRoot/Types";
import { EmailController } from "@email/inBound/EmailController";
import { Container } from "inversify";

export function emailComposerModuler(container: Container) {
  container
    .bind<EmailController>(TYPES.EmailController)
    .to(EmailController)
    .inRequestScope();
}
