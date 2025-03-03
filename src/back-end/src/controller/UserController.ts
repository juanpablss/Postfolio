import { FastifyReply, FastifyRequest } from "fastify";
import { UserModel } from "../model/UserModel";
import { UserService } from "../service/UserService";

export const UserController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, email, passWord, status } = req.body as {
      name: string;
      email: string;
      passWord: string;
      status: string;
    };

    try {
      await UserService.validate(name, email, passWord, status);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ msg: err.message });
    }

    try {
      await UserModel.insert(name, email, passWord, status);
      reply.status(200).send({ msg: "Usuario criado com sucesso!" });
    } catch (error) {
      reply.status(500).send({ msg: "Erro ao registrar usuario!" });
    }
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await UserModel.findMany();
    reply.send(allUsers);
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
