import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "../../../Infrastructure/Error/HttpError";
import Rating from "../../../Domain/Entities/Rating/Rating";
import ratingService from "../../../Application/Service/RatingServiceImp";

export const RatingController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
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
    const portfolioIdNumber = Number(portfolioId);
    const scoreNumber = Number(score);

    await ratingService.register(
      new Rating(userId, portfolioIdNumber, scoreNumber)
    );

    return reply.send({ msg: "Analise criada com sucesso!" });
  },

  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const allRatings = await ratingService.findMany();
    reply.send(allRatings);
  },

  update: async (req: FastifyRequest, reply: FastifyReply) => {
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
    const portfolioIdNumber = Number(portfolioId);
    const scoreNumber = Number(score);

    const rating = new Rating(userId, portfolioIdNumber, scoreNumber);
    await ratingService.update(rating);

    reply.send({ msg: "Atualização bem sucedida!", rating: rating });
  },

  delete: async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;

    const params = req.params as { portfolioId: string };
    const portfolioId = Number(params.portfolioId);

    if (!portfolioId || typeof portfolioId !== "number")
      throw new HttpError(400, "Id do portofolio é obrigatorio!");

    if (!userId) throw new HttpError(400, "Id do usuario é obrigatorio!");

    const rating = await ratingService.delete(userId, portfolioId);

    reply.send(rating);
  },
};
