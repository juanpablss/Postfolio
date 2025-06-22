import jwt from "jsonwebtoken";
import { HttpError } from "@domain/error/HttpError";

export const Token = {
  generate(id: string, email: string): string {
    try {
      const secret = process.env.JWT_SECRET || "default_secret";

      const token = jwt.sign({ id, email }, secret, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new HttpError(500, "Não é possivel fazer login!");
    }
  },
};
