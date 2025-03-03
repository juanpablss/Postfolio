import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export const UserMiddle = {
  authenticate: async (req: FastifyRequest, resply: FastifyReply) => {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return resply.status(401).send({ msg: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    if (!token) {
      return resply.status(401).send({ msg: "Token inválido" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
      };
      req.UserReq = decoded;
    } catch (error) {
      return resply.status(401).send({ msg: "Token inválido ou expirado" });
    }
  },
};
