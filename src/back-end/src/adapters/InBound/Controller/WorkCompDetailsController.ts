import { BadRequest } from "@domain/error/HttpError";
import workCompDetailsServiceImp from "@service/WorkCompDetailsServiceImp";
import WorkCompDetailsUseCase from "@useCases/WorkCompDetailsUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

class WorkCompDetailsController {
  constructor(
    private readonly workCompDetailsServiceImp: WorkCompDetailsUseCase
  ) {}

  async getWorkDetails(req: FastifyRequest, reply: FastifyReply) {
    const { competition, work } = req.params as {
      competition: string;
      work: string;
    };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");
    if (!work) throw new BadRequest("ID da competição é obrigatorio");

    const response =
      await this.workCompDetailsServiceImp.findByCompetitionAndWork(
        competition,
        work
      );

    reply.send(response);
  }
}

const workCompDetailsController = new WorkCompDetailsController(
  workCompDetailsServiceImp
);
export default workCompDetailsController;
