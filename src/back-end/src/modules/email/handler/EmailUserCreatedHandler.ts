import { TYPES } from "@compositionRoot/Types";
import { IEmailService } from "@email/service/IEmailService";
import { EventHandler, EventListener } from "@shared/event/EventListener";
import { UserCreatedEvent } from "@shared/event/UserCreatedEvent";
import { inject, injectable } from "inversify";

//   await transporter.sendMail({
//     from: '"Postfolio" <postfolio.oficial@gmail.com>',
//     to: "antoniowillissilvasantos@gmail.com",
//     subject: "Bem vindo a plataforma",
//     html: `<p>Olá</p>`,
//   });

@injectable()
export class EmailUserCreatedHandler implements EventHandler<UserCreatedEvent> {
  constructor(
    @inject(TYPES.IEmailService)
    private emailService: IEmailService
  ) {
    EventListener.subscribeHandler(this);
    console.log("[EmailUserCreatedHandler] foi criado\n");
  }

  async handle(event: UserCreatedEvent): Promise<void> {
    const response = await this.emailService.sendMail({
      from: `Postfolio <${process.env.EMAIL}>`,
      to: event.userEmail,
      subject: "Bem vindo a plataforma",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4CAF50; text-align: center;">🎉 Bem-vindo ao Postfolio!</h2>
        <p style="font-size: 16px; color: #333;">Olá <strong>${
          event.userName ?? ""
        }</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          Estamos muito felizes por ter você com a gente! Agora você faz parte de uma plataforma que conecta projetos e oportunidades de forma prática e eficiente.
        </p>
        <p style="font-size: 16px; color: #333;">
          Comece agora mesmo a criar seu portfólio, explorar projetos incríveis e se destacar.
        </p>
        <p style="font-size: 14px; color: #888;">Se você tiver dúvidas, estamos aqui para ajudar!</p>
        <p style="font-size: 14px; color: #888;">Abraços, <br>Equipe Postfolio</p>
      </div>
    </div>
  `,
    });

    if (!response)
      console.log("Não foi possivel enviar email de boas vindas.\n");
  }

  getEventId(): string {
    return UserCreatedEvent.ID;
  }
}
