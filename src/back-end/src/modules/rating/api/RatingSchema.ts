import { FastifyRequest } from "fastify";
import z from "zod";

const UpsertRatingBodySchema = z.object({
  user: z.string({ message: "O usuario é obrigatorio" }),
  competition: z.string({ message: "A competição é obrigatorio" }),
  project: z.string({ message: "O project é obrigatorio" }),
  score: z.number({ message: "A pontuação é obrigatorio" }),
});

type UpsertRatingRequest = FastifyRequest<{
  Body: z.infer<typeof UpsertRatingBodySchema>;
}>;

const ratingRouteSchema = {
  upsert: {
    body: UpsertRatingBodySchema,
  },
};

export { ratingRouteSchema, UpsertRatingRequest };
