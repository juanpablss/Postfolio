import { FastifyInstance } from "fastify";
import { WorkController } from "@work/inBound/WorkController";
import { UserMiddle } from "@infrastructure/middleware/UserMiddle";
import {
  RegisterWorkRequest,
  UpdateWorkRequest,
  workRouteSchema,
} from "@work/inBound/WorkSchema";

function workRoutesPlugin(
  app: FastifyInstance,
  workController: WorkController
) {
  app.post(
    "",
    { schema: workRouteSchema.create, preValidation: UserMiddle.authenticate },
    (req, rep) => workController.register(req as RegisterWorkRequest, rep)
  );

  app.post("/all", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.getAll(req, rep)
  );

  app.post("/:work", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.getById(req, rep)
  );

  app.put(
    "/:work",
    { schema: workRouteSchema.update, preValidation: UserMiddle.authenticate },
    (req, rep) => workController.update(req as UpdateWorkRequest, rep)
  );

  app.delete("/:work", { preValidation: UserMiddle.authenticate }, (req, rep) =>
    workController.delete(req, rep)
  );
}

export class WorkRoute {
  public static register(app: FastifyInstance, workController: WorkController) {
    app.register((data) => workRoutesPlugin(data, workController), {
      prefix: "api/work",
    });
  }
}
