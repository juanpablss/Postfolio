import { TYPES } from "@compositionRoot/Types";
import { IEmailService } from "@email/domain/interfaces/IEmailService";
import { EventHandler, EventListener } from "@shared/event/EventListener";
import { UserUpdateEvent } from "@shared/event/UserUpdateEvent";
import { inject, injectable } from "inversify";

@injectable()
export class EmailUserUpdateHandler implements EventHandler<UserUpdateEvent> {
  constructor(
    @inject(TYPES.IEmailService)
    private emailService: IEmailService
  ) {
    EventListener.subscribeHandler(this);
    console.log("[EmailUserUpdateHandler] foi criado\n");
  }

  async handle(event: UserUpdateEvent): Promise<void> {
    let subject: string;
    let html: string;

    if (event.changeEmail) {
      subject = "Confirmação de Alteração de E-mail";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #FFC107; text-align: center;">✉️ Confirmação de Alteração de E-mail</h2>
            <p style="font-size: 16px; color: #333;">Olá <strong>${
              event.userName ?? ""
            }</strong>,</p>
            <p style="font-size: 16px; color: #333;">
              Estamos escrevendo para confirmar que o endereço de e-mail associado à sua conta na plataforma Postfolio foi alterado com sucesso para:
              <strong>${event.userEmail}</strong>.
            </p>
            <p style="font-size: 16px; color: #333;">
              Se você não solicitou essa alteração, por favor, entre em contato com nossa equipe de suporte imediatamente para garantir a segurança da sua conta.
            </p>
            <p style="font-size: 14px; color: #888;">A sua segurança é nossa prioridade.</p>
            <p style="font-size: 14px; color: #888;">Atenciosamente, <br>Equipe Postfolio</p>
          </div>
        </div>
      `;
    } else {
      subject = "Seu Perfil Foi Atualizado!";
      html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2196F3; text-align: center;">✅ Seu Perfil Foi Atualizado!</h2>
            <p style="font-size: 16px; color: #333;">Olá <strong>${
              event.userName ?? ""
            }</strong>,</p>
            <p style="font-size: 16px; color: #333;">
              Confirmamos que o seu perfil na plataforma Postfolio foi atualizado com sucesso.
            </p>
            <p style="font-size: 16px; color: #333;">
              Se você não realizou essa alteração, por favor, entre em contato com nossa equipe de suporte imediatamente.
            </p>
            <p style="font-size: 14px; color: #888;">Qualquer dúvida, estamos à disposição para ajudar!</p>
            <p style="font-size: 14px; color: #888;">Atenciosamente, <br>Equipe Postfolio</p>
          </div>
        </div>
      `;
    }

    const response = await this.emailService.sendMail({
      from: `Postfolio <${process.env.EMAIL}>`,
      to: event.userEmail,
      subject: subject,
      html: html,
    });

    if (!response) {
      console.log(
        `Não foi possível enviar o email de ${
          event.changeEmail ? "alteração de email" : "atualização de perfil"
        }.\n`
      );
    }
  }

  getEventId(): string {
    return UserUpdateEvent.ID;
  }
}
