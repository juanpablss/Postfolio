import { FastifyRequest } from "fastify";
import { z } from "zod";

const CreateUserBodySchema = z.object({
  username: z
    .string({ message: "O nome é obrigatorio" })
    .min(3, "O nome é muito curto")
    .max(100, "O nome é muito longo"),
  email: z.string({ message: "O email é obrigatorio" }),
  password: z
    .string({ message: "A senha é obrigatoria" })
    .min(8, "Senha muito curta")
    .max(100, "Senha muito longa"),
  bio: z.string().max(200),
  linkedin: z
    .string()
    .url({ message: "", protocol: /^https?$/ })
    .optional(),
  github: z
    .string()
    .url({ message: "", protocol: /^https?$/ })
    .optional(),
  website: z
    .string()
    .url({ message: "", protocol: /^https?$/ })
    .optional(),
  status: z.string().default("None"),
});

type CreateUserRequest = FastifyRequest<{
  Body: z.infer<typeof CreateUserBodySchema>;
}>;

const LoginUserBodySchema = z.object({
  email: z
    .string({ message: "O email é obrigatório" })
    .email("O email é invalido"),
  password: z.string({ message: "A senha é obrigatória" }),
});

type LoginRequest = FastifyRequest<{
  Body: z.infer<typeof LoginUserBodySchema>;
}>;

const userRouteSchema = {
  create: {
    body: CreateUserBodySchema,
  },
  login: {
    body: LoginUserBodySchema,
  },
};

export { userRouteSchema, CreateUserRequest, LoginRequest };
