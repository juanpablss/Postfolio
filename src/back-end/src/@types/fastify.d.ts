import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    UserReq?: {
      id: string;
      email: string;
    };
  }
}
