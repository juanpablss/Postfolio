import { FastifyInstance } from "fastify";
import { EmailController } from "@email/inBound/EmailController";
import { emailRouteSchema, SendEmailRequest } from "@email/inBound/EmailShema";

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
