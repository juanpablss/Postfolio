import { FastifyRequest } from "fastify";
import z from "zod";

const CreatePortfolioBodySchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa"),
  pagelink: z.string(),
});

type CreatePortfolioRequest = FastifyRequest<{
  Body: z.infer<typeof CreatePortfolioBodySchema>;
}>;

const UpdatePortfolioParamsSchema = z.object({
  id: z.string().uuid("ID do portfolio inválido"),
});

const UpdatePortfolioBodySchema = CreatePortfolioBodySchema.partial();

type UpdatePortfolioRequest = FastifyRequest<{
  Body: z.infer<typeof UpdatePortfolioBodySchema>;
  Params: z.infer<typeof UpdatePortfolioParamsSchema>;
}>;

const portfolioRouteSchemas = {
  create: { body: CreatePortfolioBodySchema },
  update: { body: UpdatePortfolioBodySchema, UpdatePortfolioParamsSchema },
};

export {
  portfolioRouteSchemas,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
};
