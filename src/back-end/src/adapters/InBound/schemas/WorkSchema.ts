import { FastifyRequest } from "fastify";
import { z } from "zod";

const CreateWorkBodySchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  description: z.string().max(500, "Descrição muito longa"),
  githublink: z.string().optional(),
  portfolio: z.string(),
});

type RegisterWorkRequest = FastifyRequest<{
  Body: z.infer<typeof CreateWorkBodySchema>;
}>;

const UpdateWorkParamsSchema = z.object({
  id: z.string().uuid("ID do trabalho é obrigatorio"),
});

const UpdateWorkBodySchema = z.object({
  name: z
    .string({ message: "O nome é obrigatorio" })
    .min(3, "O nome é muito curto")
    .max(100, "O nome é muito grande"),
  description: z
    .string({ message: "A descrição é obrigatorio" })
    .max(500, "Descrição muito longa"),
  githublink: z.string().optional(),
  portfolio: z.string({ message: "O portfolio é obrigatorio" }).uuid(),
});

type UpdateWorkRequest = FastifyRequest<{
  Body: z.infer<typeof UpdateWorkBodySchema>;
  Params: z.infer<typeof UpdateWorkParamsSchema>;
}>;

const workRouteSchema = {
  create: {
    body: CreateWorkBodySchema,
  },
  update: {
    body: UpdateWorkBodySchema,
    params: UpdateWorkParamsSchema,
  },
};

export {
  workRouteSchema,
  RegisterWorkRequest,
  UpdateWorkRequest,
  UpdateWorkParamsSchema,
  UpdateWorkBodySchema,
};
