import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";
import { HttpError } from "../error/HttpError";
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
    await userService.register(name, email, passWord, status);

    return reply.send({ msg: "Usuario criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const userService = UserService(UserRepository);
    const allUsers = await userService.findMany();
    reply.send(allUsers);
  },

  getByEmail: async (req: FastifyRequest, reply: FastifyReply) => {
    throw new HttpError(500, "Método não implementado!");
    // const userService = UserService(UserRepository);
    // try {
    //   const user = await userService.findByEmail(email);
    //   return reply.send(user);
    // } catch (error) {
    //   const err = error as Error;
    //   reply.status(400).send({ msg: err.message });
    // }
  },

  login: async (req: FastifyRequest, resply: FastifyReply) => {
    const { email = null, passWord = null } = req.body as Partial<{
      email: string;
      passWord: string;
    }>;

    const userService = UserService(UserRepository);
    const token = await userService.login(email, passWord);
    resply.send({ msg: "Login bem-sucedido!", token });
  },

  getProfile: async (req: FastifyRequest, resply: FastifyReply) => {
    resply.send({ msg: "Perfil do usuário", user: req.user });
  },
};
