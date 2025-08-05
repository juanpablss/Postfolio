import { FastifyInstance } from "fastify";
import { EmailController } from "@email/inBound/EmailController";

function emailRoutePlugin(app: FastifyInstance, controller: EmailController) {
  app.post("", (req, rep) => controller.sendEmail(req, rep));
}

export class EmailRoute {
  public static register(app: FastifyInstance, controller: EmailController) {
    app.register((data) => emailRoutePlugin(data, controller), {
      prefix: "api/email",
    });
  }
}
