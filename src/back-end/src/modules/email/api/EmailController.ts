import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "inversify";
import { SendEmailRequest } from "@email/api/EmailShema";
import { TYPES } from "@compositionRoot/Types";
import { IEmailService } from "@email/domain/interfaces/IEmailService";
import { BadRequest } from "@shared/error/HttpError";

@injectable()
export class EmailController {
  constructor(
    @inject(TYPES.IEmailService)
    private emailService: IEmailService
  ) {}

  async sendEmail(req: SendEmailRequest, reply: FastifyReply) {
    const user = req.user;

    if (!user) throw new BadRequest("O usuario precisa estar logado");

    const body = req.body;

    const response = await this.emailService.sendMail({
      from: user.email,
      to: body.to,
      subject: body.subject,
      html: body.html,
    });
    if (!response)
      return reply.status(500).send({ msg: "Ocorreu um erro inesperado!" });
    reply.send({ msg: "Email enviado com sucesso!" });
  }
}
