import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "@infrastructure/error/HttpError";
import User from "@domain/entities/user/User";
import UserUseCases from "@useCases/UserUseCases";

export class UserController {
  // private useService: UserUseCases;
  private str: string = "STRING";

  constructor(private readonly userService: UserUseCases) {
    // console.log("AQUI\n");
  }

  async hello(req: FastifyRequest, reply: FastifyReply) {
    console.log(this.str);
    reply.send({ msg: "Ola mundo" });
  }

  async register(req: FastifyRequest, reply: FastifyReply) {
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

    await this.userService.register(
      new User("", name, email, passWord, status)
    );

    return reply.send({ msg: "Usuario criado com sucesso!" });
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const allUsers = await this.userService.findMany();
    reply.send(allUsers);
  }

  async getByEmail(req: FastifyRequest, reply: FastifyReply) {
    throw new HttpError(500, "Método não implementado!");
  }

  async login(req: FastifyRequest, reply: FastifyReply) {
    const { email = null, password = null } = req.body as Partial<{
      email: string;
      password: string;
    }>;

    if (!email) throw new HttpError(400, "O email é obrigatório!");
    if (!password) throw new HttpError(400, "A senha é obrigatória!");

    const token = await this.userService.login(email, password);

    reply.send({ msg: "Login bem-sucedido!", token });

    // Meramente para testes
    // console.log("Teste Cassios: ", email, " : ", password);

    // reply.send({
    //   msg: "Login bem-sucedido!",
    //   dados: {
    //     email,
    //     password,
    //   },
    // });
  }

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    reply.send({ msg: "Perfil do usuário", user: req.user });
  }

  async deleteById(req: FastifyRequest, reply: FastifyReply) {
    const id = req.user?.id;
    if (!id) throw new HttpError(400, "Id do usuario é obrigatorio!");

    const user = await this.userService.deleteById(id);
    reply.send(user);
  }
}

/*
export const UserController = {
  hello: async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ msg: "Ola mundo" });
  },
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

    await userService.register(new User("", name, email, passWord, status));

    return reply.send({ msg: "Usuario criado com sucesso!" });
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await userService.findMany();
    reply.send(allUsers);
  },

  getByEmail: async (req: FastifyRequest, reply: FastifyReply) => {
    throw new HttpError(500, "Método não implementado!");
  },

  login: async (req: FastifyRequest, reply: FastifyReply) => {
    const { email = null, password = null } = req.body as Partial<{
      email: string;
      password: string;
    }>;

    console.log("\nAQUI\n");

    if (!email) throw new HttpError(400, "O email é obrigatório!");
    if (!password) throw new HttpError(400, "A senha é obrigatória!");

    // const token = await userService.login(email, password);

    // reply.send({ msg: "Login bem-sucedido!", token });

    console.log("Teste Cassios: ", email, " : ", password);

    reply.send({
      msg: "Login bem-sucedido!",
      dados: {
        email,
        password,
      },
    });
  },

  getProfile: async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ msg: "Perfil do usuário", user: req.user });
  },

  getPortfolios: async (req: FastifyRequest, reply: FastifyReply) => {
    const authorID = req.user?.id;

    if (!authorID)
      throw new HttpError(400, "Os dados enviados não são validos!");

    const portfolios = await userService.findPortfolios(authorID);

    reply.send(portfolios);
  },

  getRatings: async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;
    if (!userId) throw new HttpError(400, "Id do usuario é obrigatorio!");

    const ratings = await userService.findRatings(userId);

    reply.send(ratings);
  },

  deleteById: async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.user?.id;
    if (!id) throw new HttpError(400, "Id do usuario é obrigatorio!");

    const user = await userService.deleteById(id);
    reply.send(user);
  },
};
*/
