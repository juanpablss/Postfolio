import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "inversify";
import nodemailer from "nodemailer";
import { SendEmailRequest } from "@email/inBound/EmailShema";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_KEY,
  },
});

@injectable()
export class EmailController {
  async sendEmail(req: SendEmailRequest, reply: FastifyReply) {
    const body = req.body;

    console.log(`${body.subject}\nto: ${body.to}\nhtml: ${body.html}`);
    //   await transporter.sendMail({
    //     from: '"Postfolio" <postfolio.oficial@gmail.com>',
    //     to: "antoniowillissilvasantos@gmail.com",
    //     subject: "Bem vindo a plataforma",
    //     html: `<p>Olá</p>`,
    //   });
  }
}
