import { FastifyRequest } from "fastify";
import { z } from "zod";

const GetMessageParamsSchema = z.object({
  otherUser: z.string({ message: "o outro usuario é obrigatorio" }),
});

const GetMessageQuerySchema = z.object({
  limit: z.number({ message: "O limite é obrigatorio" }),
  date: z.date({ message: "A data é obrigatoria" }),
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
