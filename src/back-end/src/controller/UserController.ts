import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import "../@types/fastify";

export const UserController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const {
      name = null,
      email = null,
      passWord = null,
      status = null,
    } = req.body as Partial<{
      name: string;
      email: string;
      passWord: string;
      status: string;
    }>;

    const userService = UserService(UserRepository);

    try {
      await userService.register(name, email, passWord, status);
    } catch (error) {
      if (error instanceof HttpError)
        return reply.status(error.status).send({ msg: error.message });
      return reply.status(400).send({ msg: "Erro ao registrar usuario!" });
    }

    return reply.send({ msg: "Usuario criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const userService = UserService(UserRepository);
    const allUsers = await userService.findMany();
    reply.send(allUsers);
  },

  getByEmail: async (req: FastifyRequest, reply: FastifyReply) => {
    const { email = null } = req.body as Partial<{ email: string }>;

    const userService = UserService(UserRepository);

    try {
      const user = await userService.findByEmail(email);
      return reply.send(user);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ msg: err.message });
    }
  },

  login: async (req: FastifyRequest, resply: FastifyReply) => {
    const { email = null, passWord = null } = req.body as Partial<{
      email: string;
      passWord: string;
    }>;

    try {
      const userService = UserService(UserRepository);
      const token = await userService.login(email, passWord);

      resply.send({ msg: "Login bem-sucedido!", token });
    } catch (error) {
      if (error instanceof HttpError)
        return resply.status(error.status).send({ msg: error.message });
      resply.status(500).send({ msg: "Não foi possivel fazer login!" });
    }
  },

  getProfile: async (req: FastifyRequest, resply: FastifyReply) => {
    resply.send({ msg: "Perfil do usuário", user: req.user });
  },
};
