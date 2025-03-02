import { FastifyReply, FastifyRequest } from "fastify";
import { UserModel } from "../model/UserModel";

export const UserController = {
  create: async (req: FastifyRequest, res: FastifyReply) => {
    const { name, email, passWord, status } = req.body as {
      name: string;
      email: string;
      passWord: string;
      status: string;
    };
    const user = await UserModel.create(name, email, passWord, status);
    return user;
  },
  getAll: async (req: FastifyRequest, res: FastifyReply) => {
    const allUsers = await UserModel.findMany();
    res.send(allUsers);
  },
  getByEmail: async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.query as { email: string };
    const user = await UserModel.findByEmail(email);
    return user;
  },
};
