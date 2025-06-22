import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "@domain/error/HttpError";
import Rating from "@domain/entities/rating/Rating";
import RatingUseCases from "@useCases/RatingUseCases";
// import ratingService from "@application/service/RatingServiceImp";

export default class RatingControllerT {
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
      throw new HttpError(400, "Todos os campos são obrigatórios!");

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
      throw new HttpError(400, "Todos os campos são obrigatórios!");

    const existingRating = await this.ratingService.findByUserAndPortfolio(
      userId,
      portfolioId
    );

    if (!existingRating)
      throw new HttpError(
        404,
        "Avaliação não encontrado para o usuário e portfólio informados."
      );

    const newScore = Number(score);

    const rating = new Rating(
      existingRating.portfolioId,
      userId,
      portfolioId,
      newScore
    );
    await this.ratingService.update(rating);

    reply.send({ msg: "Atualização bem sucedida!", rating: rating });
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const userId = req.user?.id;

    const params = req.params as { portfolioId: string };
    const portfolioId = params.portfolioId;

    if (!portfolioId)
      throw new HttpError(400, "Id do portofolio é obrigatorio!");

    if (!userId) throw new HttpError(400, "Id do usuario é obrigatorio!");

    const existingRating = await this.ratingService.findByUserAndPortfolio(
      userId,
      portfolioId
    );

    if (!existingRating)
      throw new HttpError(
        404,
        "Avaliação não encontrado para o usuário e portfólio informados."
      );

    const rating = await this.ratingService.delete(existingRating.id);

    reply.send(rating);
  }
}

// export const RatingController = {
//   register: async (req: FastifyRequest, reply: FastifyReply) => {
//     const {
//       userId = req.user?.id,
//       portfolioId = null,
//       score = null,
//     } = req.body as Partial<{
//       userId: string;
//       portfolioId: string;
//       score: string;
//     }>;

//     if (!userId || !portfolioId || !score)
//       throw new HttpError(400, "Todos os campos são obrigatórios!");

//     const scoreNumber = Number(score);

//     await ratingService.register(
//       new Rating("", userId, portfolioId, scoreNumber)
//     );

//     return reply.send({ msg: "Analise criada com sucesso!" });
//   },

//   getAll: async (req: FastifyRequest, reply: FastifyReply) => {
//     const allRatings = await ratingService.findMany();
//     reply.send(allRatings);
//   },

//   update: async (req: FastifyRequest, reply: FastifyReply) => {
//     const {
//       userId = req.user?.id,
//       portfolioId = null,
//       score = null,
//     } = req.body as Partial<{
//       userId: string;
//       portfolioId: string;
//       score: string;
//     }>;

//     if (!userId || !portfolioId || !score)
//       throw new HttpError(400, "Todos os campos são obrigatórios!");

//     const existingRating = await ratingService.findByUserAndPortfolio(
//       userId,
//       portfolioId
//     );

//     if (!existingRating)
//       throw new HttpError(
//         404,
//         "Avaliação não encontrado para o usuário e portfólio informados."
//       );

//     const newScore = Number(score);

//     const rating = new Rating(
//       existingRating.portfolioId,
//       userId,
//       portfolioId,
//       newScore
//     );
//     await ratingService.update(rating);

//     reply.send({ msg: "Atualização bem sucedida!", rating: rating });
//   },

//   delete: async (req: FastifyRequest, reply: FastifyReply) => {
//     const userId = req.user?.id;

//     const params = req.params as { portfolioId: string };
//     const portfolioId = params.portfolioId;

//     if (!portfolioId)
//       throw new HttpError(400, "Id do portofolio é obrigatorio!");

//     if (!userId) throw new HttpError(400, "Id do usuario é obrigatorio!");

//     const existingRating = await ratingService.findByUserAndPortfolio(
//       userId,
//       portfolioId
//     );

//     if (!existingRating)
//       throw new HttpError(
//         404,
//         "Avaliação não encontrado para o usuário e portfólio informados."
//       );

//     const rating = await ratingService.delete(existingRating.id);

//     reply.send(rating);
//   },
// };
