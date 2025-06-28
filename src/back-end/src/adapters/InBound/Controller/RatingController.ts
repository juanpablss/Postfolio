import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest, NotFound } from "@domain/error/HttpError";
import Rating from "@domain/entities/rating/Rating";
import RatingUseCases from "@useCases/RatingUseCases";
import ratingService from "@service/RatingServiceImp";
// import ratingService from "@application/service/RatingServiceImp";

class RatingController {
  constructor(private readonly ratingService: RatingUseCases) {}

  async register(req: FastifyRequest, reply: FastifyReply) {
    const {
      userId = req.user?.id,
      portfolioId = null,
      score = null,
    } = req.body as Partial<{
      userId: string;
      portfolioId: string;
      score: string;
    }>;

    if (!userId || !portfolioId || !score)
      throw new BadRequest("Todos os campos são obrigatórios!");

    const scoreNumber = Number(score);

    await this.ratingService.register(
      new Rating("", userId, portfolioId, scoreNumber)
    );

    return reply.send({ msg: "Analise criada com sucesso!" });
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const allRatings = await this.ratingService.findMany();
    reply.send(allRatings);
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { competition, work, rating } = req.params as {
      competition: string;
      work: string;
      rating: string;
    };

    const { score = null } = req.body as Partial<{
      score: string;
    }>;

    if (!competition) throw new BadRequest("ID da competição é obrigatorio");
    if (!work) throw new BadRequest("ID do trabalho é obrigatorio");
    if (!rating) throw new BadRequest("ID da avaliação é obrigatorio");

    if (!score) throw new BadRequest("Score é obrigatorio");

    const scoreNumber = Number(score);

    const response = await this.ratingService.update(
      scoreNumber,
      competition,
      work,
      rating
    );

    reply.send(response);
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { rating } = req.params as {
      rating: string;
    };

    const userId = req.user?.id;

    if (!userId) throw new BadRequest("Id do usuario é obrigatorio!");
    if (!rating) throw new BadRequest("Id da avaliação é obrigatorio!");

    const response = await this.ratingService.delete(rating);

    reply.send(response);
  }
}

const ratingController = new RatingController(ratingService);
export default ratingController;
