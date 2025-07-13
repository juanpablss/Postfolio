import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest, InternalServerError } from "@shared/error/HttpError";
import { CreateUserDTO, LoginUserDTO } from "@user/dtos/UserDTO";
import { LoginRequest, RegisterUserRequest } from "@user/inBound/UserSchema";
import { IUserService } from "@user/service/IUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "@compositionRoot/Types";
import jwt from "jsonwebtoken";
import { GoogleUserPayload } from "@infrastructure/types/fastify";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IUserService)
    private userService: IUserService
  ) {}

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

  async socialLogin(req: FastifyRequest, reply: FastifyReply) {
    // console.log(req.body);
    req.server.googleOAuth2.generateAuthorizationUri(
      req,
      reply,
      (err, authorizationEndpoint) => {
        if (err) console.error(err);
        reply.redirect(authorizationEndpoint);
      }
    );
    // reply.send({ msg: "deu certo" });
  }

  async socialLoginCallBack(req: FastifyRequest, reply: FastifyReply) {
    const app = req.server;

    const token =
      await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    // console.log(token + "\n");
    const id_token = token.token.id_token;

    if (!id_token) throw new BadRequest("Token não definido!");

    const userPayload = jwt.decode(id_token);

    console.log(userPayload);

    reply.send({ msg: "deu certo" });
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
