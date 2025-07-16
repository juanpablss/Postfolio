import "fastify";
import { FastifyInstance } from "fastify";
import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
    };
  }

  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export interface GoogleUserPayload {
  sub: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
