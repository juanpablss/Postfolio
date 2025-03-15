import { FastifyReply, FastifyRequest } from "fastify";
import UserRepositoryImp from "../repository/UserRepositoryImp";
import { UserServiceImp } from "../../application/service/UserServiceImp";
import { HttpError } from "../../infrastructure/error/HttpError";
import User from "../../domain/User/User";

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

    if (!name || !email || !passWord || !status)
      throw new HttpError(400, "Todos os campos são obrigatórios!");

    const userService = UserServiceImp(new UserRepositoryImp());
    await userService.register(new User(-1, name, email, passWord, status));

    return reply.send({ msg: "Usuario criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const userService = UserServiceImp(new UserRepositoryImp());
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

    const userService = UserServiceImp(new UserRepositoryImp());
    const token = await userService.login(email, passWord);
    resply.send({ msg: "Login bem-sucedido!", token });
  },

  getProfile: async (req: FastifyRequest, resply: FastifyReply) => {
    resply.send({ msg: "Perfil do usuário", user: req.user });
  },
};
