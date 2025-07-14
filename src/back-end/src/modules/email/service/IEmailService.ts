import { SendEmail } from "@email/dtos/EmailDTO";

export interface IEmailService {
  sendMail(emailDto: SendEmail): Promise<boolean>;
}
