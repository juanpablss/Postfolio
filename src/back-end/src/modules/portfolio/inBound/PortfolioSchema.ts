import { FastifyRequest } from "fastify";
import z from "zod";

// Schema para os params (URL parameters)
// const ParamsSchema = z.object({
//   authorId: z.string().uuid("ID do autor inválido"),
// });

// Schema para o body
const CreatePortfolioBodySchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa"),
  pagelink: z.string(),
});

type RegisterPortfolioRequest = FastifyRequest<{
  Body: z.infer<typeof CreatePortfolioBodySchema>;
}>;

const UpdatePortfolioBodySchema = z.object({
  name: z.string({ message: "O nome é obrigatorio" }),
  description: z.string().max(500, "Descrição muito longa"),
  pagelink: z.string(),
});

const UpdatePortfolioParamsSchema = z.object({
  id: z.string().uuid("ID do portfolio inválido"),
});

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
  RegisterPortfolioRequest,
  UpdatePortfolioRequest,
};
