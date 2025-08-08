import { SendEmail } from "@email/dtos/EmailDTO";
import { IEmailService } from "@email/service/IEmailService";
import { mailer } from "@email/infra/Mailer";
import { injectable } from "inversify";

@injectable()
export class EmailService implements IEmailService {
  async sendMail(emailDto: SendEmail): Promise<boolean> {
    try {
      await mailer.sendMail({
        from: emailDto.from,
        to: emailDto.to,
        subject: emailDto.subject,
        html: emailDto.html,
      });
    } catch (error) {
      return false;
    }
    return true;
  }
}
