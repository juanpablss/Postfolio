import { Competition } from "@competition/domain/entities/Competition";
import { ICompetitionService } from "@competition/service/ICompetitionService";
import { TYPES } from "@compositionRoot/Types";
import { BadRequest, InternalServerError } from "@shared/error/HttpError";
import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "inversify";

@injectable()
export class CompetitionController {
  constructor(
    @inject(TYPES.ICompetitionService)
    private competitionService: ICompetitionService
  ) {}

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
    const { competitionId, workId } = req.params as {
      competitionId: string;
      workId: string;
    };

    if (!competitionId) throw new BadRequest("ID da competição é obrigatorio");
    if (!workId) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.subscribeWork(
      competitionId,
      workId
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

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { competitionId } = req.params as { competitionId: string | null };
    const {
      name = null,
      startsAt = null,
      endsAt = null,
    } = req.body as Partial<{ name: string; startsAt: string; endsAt: string }>;

    // criar um dto para isso
    throw new InternalServerError("Not Implemented");
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { competition } = req.params as { competition: string };

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.deleteCompetition(
      competition
    );

    reply.send(response);
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const responses = await this.competitionService.findMany();

    reply.send(responses);
  }

  async getCompetition(req: FastifyRequest, reply: FastifyReply) {
    const { competitionId } = req.params as { competitionId: string };

    if (!competitionId) throw new BadRequest("ID da competição é obrigatorio");

    const response = await this.competitionService.findById(competitionId);
    console.log("{competition}(POST /:competitionID)[getCompetition]");
    reply.send(response);
  }

  async getWorkDetailsForCompetition(req: FastifyRequest, reply: FastifyReply) {
    const { competitionId } = req.params as {
      competitionId: string;
      workId: string;
    };

    const response = await this.competitionService.findSubscribedWorks(
      competitionId
    );

    reply.send(response);
  }

  async getWorkDetails(req: FastifyRequest, reply: FastifyReply) {
    const { competitionId, workId } = req.params as {
      competitionId: string;
      workId: string;
    };

    const response = await this.competitionService.findWorkCompDetails(
      competitionId,
      workId
    );

    reply.send(response);
  }
}
