import { GenericHttpError } from "@shared/error/HttpError";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  details?: any;
  timestamp?: string;
}

export default function configureErrorHandling(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  //   console.log("Error");
  const response: ErrorResponse = {
    statusCode: 500,
    error: "Internal Server Error",
    message: "Ocorreu um erro inesperado",
    timestamp: new Date().toISOString(),
  };

  console.log(`\nAQUI ${typeof error}\n`);
  console.log(`\nAQUI ${error}\n`);

  // if(error instanceof FastifyError){

  // }

  // if (error instanceof ZodError) {
  //   console.log(`\n${error.errors[0].message}\n`);
  //   return reply.status(400).send(new ValidationError(error.errors));
  // }

  // Tratamento para erros conhecidos
  if (error instanceof GenericHttpError) {
    response.statusCode = error.statusCode;
    response.error = error.name;
    response.message = error.message;
  }

  if (error.code == "FST_ERR_VALIDATION") {
    response.statusCode = error.statusCode || 500;
    response.error = error.name;
    response.message = error.message;
  }

  request.log.error(
    {
      err: error, // Campo especial que o Pino reconhece
      reqId: request.id,
      path: request.url,
      params: request.params,
      query: request.query,
    },
    error.message
  );

  reply.status(response.statusCode).send(response);
}
