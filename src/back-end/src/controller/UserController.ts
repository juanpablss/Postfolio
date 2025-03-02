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
  login: async (req: FastifyRequest, res: FastifyReply) => {
    const { email, passWord } = req.body as { email: string; passWord: string };

    const user = await UserModel.findByEmail(email);

    if (!user)
      return res.status(400).send({ message: "Usuário não encontrado" });
    if (passWord !== user.passWord)
      return res.status(401).send({ message: "Senha incorreta" });

    res.send({ message: "Login bem-sucedido!" });
  },
};
