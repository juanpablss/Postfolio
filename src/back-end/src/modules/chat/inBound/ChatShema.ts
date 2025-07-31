import { FastifyRequest } from "fastify";
import { z } from "zod";

const GetMessageParamsSchema = z.object({
  otherUser: z.string({ message: "o outro usuario é obrigatorio" }),
});

const GetMessageQuerySchema = z.object({
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "O limite deve ser um número" }),

  date: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Data inválida",
    }),

  direction: z.enum(["before", "after"], {
    message: "A direção é obrigatoria",
  }),
});

type GetMessageRequest = FastifyRequest<{
  Params: z.infer<typeof GetMessageParamsSchema>;
  Querystring: z.infer<typeof GetMessageQuerySchema>;
}>;

const messageRouteSchema = {
  get: { params: GetMessageParamsSchema, querystring: GetMessageQuerySchema },
};

export { messageRouteSchema, GetMessageRequest };
