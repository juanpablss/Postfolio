import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest, InternalServerError } from "@shared/error/HttpError";
import { CreateUserDTO, LoginUserDTO } from "@user/aplication/dtos/UserDTO";
// import { LoginRequest, RegisterUserRequest } from "@schamas/UserSchema";
import {
  LoginRequest,
  RegisterUserRequest,
} from "@user/infra/inBound/schema/UserSchema";
import IUserService from "@user/aplication/ports/IUserService";

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async hello(req: FastifyRequest, reply: FastifyReply) {
    reply.send({ msg: "Ola mundo" });
  }

  async register(req: RegisterUserRequest, reply: FastifyReply) {
    const userDto: CreateUserDTO = { ...req.body };

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

  async login(req: LoginRequest, reply: FastifyReply) {
    const loginDto = req.body as LoginUserDTO;

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
