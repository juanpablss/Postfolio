import { User } from "@prisma/client";
// import { UserRepository } from "../repository/UserRepository";
import { IUserRepository } from "../repository/contracts/IUserRepository";
import { Cryto } from "../util/Crypto";
import jwt from "jsonwebtoken";
import { HttpError } from "../error/HttpError";

export const UserService = (userRepository: IUserRepository) => ({
  register: async (
    name: string | null,
    email: string | null,
    passWord: string | null,
    status: string | null
  ) => {
    if (!name) throw new HttpError(400, "O nome é obrigatório!");
    if (!email) throw new HttpError(400, "O email é obrigatório!");
    if (!passWord) throw new HttpError(400, "A senha é obrigatória!");
    if (!status) throw new HttpError(400, "O status é obrigatório!");

    const user = await userRepository.findByEmail(email);

    if (user) throw new HttpError(400, "Por favor, use outro email!");

    const hashPassWord = await Cryto.hashPassWord(passWord);
    await userRepository.insert(name, email, hashPassWord, status);
  },
  findMany: async (): Promise<User[]> => {
    return userRepository.findMany();
  },
  findByEmail: async (email: string | null): Promise<User | null> => {
    if (!email) throw new HttpError(400, "O email é obrigatório!");

    const user = await userRepository.findByEmail(email);
    return user;
  },
  login: async (
    email: string | null,
    passWord: string | null
  ): Promise<string> => {
    if (!email) throw new HttpError(400, "O email é obrigatório!");
    if (!passWord) throw new HttpError(400, "A senha é obrigatória!");

    const user = await userRepository.findByEmail(email);

    if (!user) throw new HttpError(404, "Usuário não encontrado!");

    const checkPassWord = await Cryto.compare(passWord, user.passWord);

    if (!checkPassWord) throw new HttpError(401, "Senha incorreta!");

    try {
      const secret = process.env.JWT_SECRET || "default_secret";

      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      throw new HttpError(500, "Não é possivel fazer login!");
    }
  },
});
