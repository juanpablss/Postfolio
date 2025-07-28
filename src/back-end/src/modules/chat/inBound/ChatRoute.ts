import { FastifyInstance } from "fastify";
import { ChatController } from "@chat/inBound/ChatController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";

function chatRoutePlugin(app: FastifyInstance, chatController: ChatController) {
  app.get(
    "",
    {
      websocket: true,
      preValidation: UserMiddle.authenticate,
    },
    (req, rep) => chatController.connect(req, rep)
  );
}

export class ChatRoute {
  public static register(app: FastifyInstance, chatController: ChatController) {
    app.register((data) => chatRoutePlugin(data, chatController), {
      prefix: "api/chat",
    });
  }
}
