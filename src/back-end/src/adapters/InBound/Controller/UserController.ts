import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest, InternalServerError } from "@domain/error/HttpError";
import UserUseCases from "@useCases/UserUseCases";
import { CreateUserDTO, LoginUserDTO } from "@dtos/UserDTO";
import userService from "@service/UserServiceImp";

class UserController {
  constructor(private readonly userService: UserUseCases) {}

  async hello(req: FastifyRequest, reply: FastifyReply) {
    reply.send({ msg: "Ola mundo" });
  }

  async register(req: FastifyRequest, reply: FastifyReply) {
    const userDto = req.body as Partial<CreateUserDTO>;

    await this.userService.register(userDto);

    return reply.send({ msg: "Usuario criado com sucesso!" });
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const allUsers = await this.userService.findMany();
    reply.send(allUsers);
  }

  async getByEmail(req: FastifyRequest, reply: FastifyReply) {
    throw new InternalServerError("Método não implementado!");
  }

  async login(req: FastifyRequest, reply: FastifyReply) {
    const loginDto = req.body as Partial<LoginUserDTO>;

    const token = await this.userService.login(loginDto);

    reply.send({ msg: "Login bem-sucedido!", token });
  }

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    reply.send({ msg: "Perfil do usuário", user: req.user });
  }

  async deleteById(req: FastifyRequest, reply: FastifyReply) {
    const id = req.user?.id;
    if (!id) throw new BadRequest("Id do usuario é obrigatorio!");

    const user = await this.userService.deleteById(id);
    reply.send(user);
  }
}

const userController = new UserController(userService);
export default userController;
