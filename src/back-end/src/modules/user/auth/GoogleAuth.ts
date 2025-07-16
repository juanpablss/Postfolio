import type { FastifyInstance } from "fastify";
import fastifyOAuth2 from "@fastify/oauth2";

export class GoogleOAuth {
  private startRedirectPath: string;
  private callbackUri: string;

  constructor(startRedirectPath: string, callbackUri: string) {
    this.startRedirectPath = startRedirectPath;
    this.callbackUri = callbackUri;
  }

  public setup(app: FastifyInstance) {
    const googleOAuthConfig = {
      name: "googleOAuth2",
      credentials: {
        client: {
          id: process.env.GOOGLE_CLIENT_ID || "",
          secret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
        auth: fastifyOAuth2.GOOGLE_CONFIGURATION,
      },
      scope: ["profile", "email"],
      startRedirectPath: this.startRedirectPath,
      callbackUri: this.callbackUri,
    };
    console.log(`${process.env.GOOGLE_CLIENT_SECRET}\n`);
    app.register(fastifyOAuth2, googleOAuthConfig);
  }
}
