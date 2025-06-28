import { FastifyInstance } from "fastify";
import workController from "@controller/WorkController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";

export async function WorkRoutes(app: FastifyInstance) {
  app.post("", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.register(req, rep)
  );

  app.post("/all", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.getAll(req, rep)
  );

  app.post("/:work", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.getById(req, rep)
  );

  app.put("/:work", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.update(req, rep)
  );

  app.delete("/:work", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.delete(req, rep)
  );
}
