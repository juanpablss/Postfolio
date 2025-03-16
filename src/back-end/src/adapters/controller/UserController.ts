import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "../../infrastructure/error/HttpError";
import User from "../../domain/User/User";
import UserUseCases from "../../application/UseCases/UserUseCases";

export const UserController = (userService: UserUseCases) => ({
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

    await userService.register(new User(-1, name, email, passWord, status));

    return reply.send({ msg: "Usuario criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
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

  login: async (req: FastifyRequest, reply: FastifyReply) => {
    const { email = null, passWord = null } = req.body as Partial<{
      email: string;
      passWord: string;
    }>;

    const token = await userService.login(email, passWord);
    reply.send({ msg: "Login bem-sucedido!", token });
  },

  getProfile: async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ msg: "Perfil do usuário", user: req.user });
  },
  deleteById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.user?.id;

    console.log("Id Controller: ", id, "\n");
    const user = await userService.deleteById(Number(id));
    reply.send(user);
  },
});
