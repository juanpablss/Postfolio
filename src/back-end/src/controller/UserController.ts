import { FastifyReply, FastifyRequest } from "fastify";
import { UserModel } from "../model/UserModel";
import { UserService } from "../service/UserService";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import "../@types/fastify";

export const UserController = {
  register: async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, email, passWord, status } = req.body as {
      name: string;
      email: string;
      passWord: string;
      status: string;
    };

    try {
      await UserService.validateRegister(name, email, passWord, status);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ msg: err.message });
    }

    try {
      const hashPassWord = await UserService.hashPassWord(passWord);
      await UserModel.insert(name, email, hashPassWord, status);
      reply.send({ msg: "Usuario criado com sucesso!" });
    } catch (error) {
      reply.status(500).send({ msg: "Erro ao registrar usuario!" });
    }
  },
  getAll: async (req: FastifyRequest, reply: FastifyReply) => {
    const allUsers = await UserModel.findMany();
    reply.send(allUsers);
  },
  getByEmail: async (req: FastifyRequest, res: FastifyReply) => {
    const { email } = req.query as { email: string };
    const user = await UserModel.findByEmail(email);
    return user;
  },
  login: async (req: FastifyRequest, resply: FastifyReply) => {
    let email: string | null = null;
    let passWord: string | null = null;
    let user: User | null = null;
    let token: string | null = null;

    try {
      ({ email, passWord } = req.body as { email: string; passWord: string });
    } catch (error) {
      return resply.status(400).send({ msg: "email e senha são necessarios!" });
    }

    try {
      user = await UserService.validateLogin(email, passWord);
    } catch (error) {
      const err = error as Error;
      return resply.status(400).send({ msg: err.message });
    }

    try {
      const secret = process.env.JWT_SECRET || "default_secret";

      token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: "1h",
      });
    } catch (error) {
      return resply.status(500).send({ msg: "Não é possivel fazer login!" });
    }

    resply.send({ msg: "Login bem-sucedido!", token });
  },
  getProfile: async (req: FastifyRequest, resply: FastifyReply) => {
    resply.send({ msg: "Perfil do usuário", user: req.user });
  },
};
