import { FastifyRequest } from "fastify";
import z from "zod";

const SendEmailBodySchema = z.object({
  to: z.string().email("Precisa ser um email válido"),
  subject: z.string().max(100, "Titulo muito grande"),
  html: z.string().max(500, "O tamanho excedeu o limite"),
});

type SendEmailRequest = FastifyRequest<{
  Body: z.infer<typeof SendEmailBodySchema>;
}>;

const emailRouteSchema = {
  send: { body: SendEmailBodySchema },
};

export { emailRouteSchema, SendEmailRequest };
