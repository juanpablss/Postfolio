import Competition from "@domain/entities/competition/Competition";
import { BadRequest, InternalServerError } from "@domain/error/HttpError";
import competitionServiceImp from "@service/CompetitionServiceImp";
import CompetitionUseCase from "@useCases/CompetitionUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

class CompetitionController {
  constructor(private readonly competitionService: CompetitionUseCase) {}

  async register(req: FastifyRequest, reply: FastifyReply) {
    const { name = null } = req.body as Partial<{
      name: string;
    }>;

    if (!name) throw new BadRequest("O campo nome é obrigarotio");

    const competition = new Competition("", name, new Date());

    const response = await this.competitionService.register(competition);

    reply.send({
      msg: "Competição criada com sucesso",
      response,
    });
  }

  async subscribeWork(req: FastifyRequest, reply: FastifyReply) {
    const { competition, work } = req.params as {
      competition: string;
      work: string;
    };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");
    if (!work) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.subscribeWork(
      competition,
      work
    );

    reply.send(response);
  }

  async unsubscribeWork(req: FastifyRequest, reply: FastifyReply) {
    const { competition, work } = req.params as {
      competition: string;
      work: string;
    };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");
    if (!work) throw new BadRequest("ID da competição é obrigatorio");

    await this.competitionService.unsubscribeWork(competition, work);

    reply.send({ msg: "Trabalho removido da competição" });
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const responses = await this.competitionService.findMany();

    reply.send(responses);
  }

  async getById(req: FastifyRequest, reply: FastifyReply) {
    const { competition } = req.params as { competition: string };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.findById(competition);

    reply.send(response);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { competition } = req.params as { competition: string };
    const {
      name = null,
      startsAt = null,
      endsAt = null,
    } = req.body as { name: string; startsAt: string; endsAt: string };

    // criar um dto para isso
    throw new InternalServerError("Not Implemented");
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { competition } = req.params as { competition: string };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.deleteById(competition);

    reply.send(response);
  }
}

const competitionController = new CompetitionController(competitionServiceImp);
export default competitionController;
