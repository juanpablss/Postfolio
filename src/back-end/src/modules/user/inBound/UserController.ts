import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest, InternalServerError } from "@shared/error/HttpError";
import {
  CreateUserDTO,
  LoginUserDTO,
  SocialLoginDTO,
} from "@user/dtos/UserDTO";
import {
  LoginRequest,
  CreateUserRequest,
  userRouteSchema,
} from "@user/inBound/UserSchema";
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

  async create(req: CreateUserRequest, reply: FastifyReply) {
    const userDto: CreateUserDTO = { ...req.body };

    await this.userService.create(userDto);

    return reply.status(201).send({ msg: "Usuario criado com sucesso!" });
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
    req.server.googleOAuth2.generateAuthorizationUri(
      req,
      reply,
      (err, authorizationEndpoint) => {
        if (err) console.error(err);
        reply.redirect(authorizationEndpoint);
      }
    );
  }

  async socialLoginCallBack(req: FastifyRequest, reply: FastifyReply) {
    const app = req.server;

    const tokenAuthorization =
      await app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    const id_token = tokenAuthorization.token.id_token;

    if (!id_token) throw new BadRequest("Token não definido!");

    const userPayload = jwt.decode(id_token) as GoogleUserPayload;

    console.log(userPayload);

    const socialLogin: SocialLoginDTO = {
      name: userPayload.name,
      email: userPayload.email,
    };

    const token = await this.userService.socialLogin(socialLogin);

    reply.send({ msg: "Login bem-sucedido!", token });
  }

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user?.id) throw new InternalServerError("Autenticação falhou");
    const user = await this.userService.findById(req.user?.id);

    if (!user) throw new BadRequest("Id do usuario não existe");
    reply.send({
      msg: "Perfil do usuário",
      user: { id: user.id, name: user.name, email: user.email },
    });
  }

  async deleteById(req: FastifyRequest, reply: FastifyReply) {
    const id = req.user?.id;
    if (!id) throw new BadRequest("Id do usuario é obrigatorio!");

    const user = await this.userService.deleteById(id);
    reply.send(user);
  }
}
