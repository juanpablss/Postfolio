import { FastifyInstance } from "fastify";
import { EmailController } from "@email/api/EmailController";
import { emailRouteSchema, SendEmailRequest } from "@email/api/EmailShema";

// Vai ficar desativado por enquanto
function emailRoutePlugin(app: FastifyInstance, controller: EmailController) {
  // app.post(
  //   "",
  //   { schema: emailRouteSchema.send },
  //   (req: SendEmailRequest, rep) => controller.sendEmail(req, rep)
  // );
}

export class EmailRoute {
  public static register(app: FastifyInstance, controller: EmailController) {
    app.register((data) => emailRoutePlugin(data, controller), {
      prefix: "api/email",
    });
  }
}
