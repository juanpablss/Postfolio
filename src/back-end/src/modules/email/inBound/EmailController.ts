import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "inversify";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY, // Use senha de app do Gmail
  },
});

@injectable()
export class EmailController {
  async sendEmail(req: FastifyRequest, reply: FastifyReply) {
    // const { email = null } = req.body as { email: string };

    await transporter.sendMail({
      from: '"Postfolio" <postfolio.oficial@gmail.com>',
      to: "antoniowillissilvasantos@gmail.com",
      subject: "Bem vindo a plataforma",
      html: `<p>Olá</p>`,
    });
  }
}
