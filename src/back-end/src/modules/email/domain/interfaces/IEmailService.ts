import { SendEmail } from "@email/api/EmailDTO";

export interface IEmailService {
  sendMail(emailDto: SendEmail): Promise<boolean>;
}
