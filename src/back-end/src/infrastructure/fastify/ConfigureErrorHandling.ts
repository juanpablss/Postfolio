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

  console.log(`\n${error}\n`);
  console.log("[ErrorHandling]");
  // Tratamento para erros conhecidos
  if (error instanceof GenericHttpError) {
    console.log("[GenericHttpError]");
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
