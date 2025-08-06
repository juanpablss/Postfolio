import { GenericHttpError } from "@shared/error/HttpError";
import { FastifyReply, FastifyRequest } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from "fastify-type-provider-zod";

interface ErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  details?: any;
  timestamp?: string;
}

export default function configureErrorHandling(
  error: any,
  req: FastifyRequest,
  reply: FastifyReply
) {
  // console.log("Error");
  const response: ErrorResponse = {
    statusCode: 500,
    error: "Internal Server Error",
    message: "Ocorreu um erro inesperado",
    timestamp: new Date().toISOString(),
  };

  console.log(`\n${error}\n`);
  console.log("[ErrorHandling]\n");
  // Tratamento para erros conhecidos
  if (error instanceof GenericHttpError) {
    console.log("[GenericHttpError]");
    response.statusCode = error.statusCode;
    response.error = error.name;
    response.message = error.message;
  }

  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(400).send({
      error: "Response Validation Error",
      message: "A solicitação não corresponde ao esquema",
      statusCode: 400,
      details: {
        issues: error.validation,
        method: req.method,
        url: req.url,
      },
    });
  }

  if (isResponseSerializationError(error)) {
    return reply.code(500).send({
      error: "Internal Server Error",
      message: "A solicitação não corresponde ao esquema",
      statusCode: 500,
      details: {
        issues: error.cause.issues,
        method: error.method,
        url: error.url,
      },
    });
  }

  req.log.error(
    {
      err: error, // Campo especial que o Pino reconhece
      reqId: req.id,
      path: req.url,
      params: req.params,
      query: req.query,
    },
    error.message
  );

  reply.status(response.statusCode).send(response);
}
