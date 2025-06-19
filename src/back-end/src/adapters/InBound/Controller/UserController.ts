import { FastifyReply, FastifyRequest } from "fastify";
import { HttpError } from "@infrastructure/error/HttpError";
import User from "@domain/entities/user/User";
import UserUseCases from "@useCases/UserUseCases";
import Email from "@domain/valueObject/Email";

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
      new User("", name, new Email(email), passWord, status)
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
    const { emailStr = null, password = null } = req.body as Partial<{
      emailStr: string;
      password: string;
    }>;

    if (!emailStr) throw new HttpError(400, "O email é obrigatório!");
    if (!password) throw new HttpError(400, "A senha é obrigatória!");

    const email = new Email(emailStr);
    const token = await this.userService.login(email, password);

    reply.send({ msg: "Login bem-sucedido!", token });
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
